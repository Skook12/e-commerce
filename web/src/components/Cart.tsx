import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { useGetCart } from "@/http/services/cart/cart-get-service";
import { Badge } from "./ui/badge";
import {
  useRemoveCart,
  useRemoveItemCart,
} from "@/http/services/cart/cart-delete-service";
import { showErrorToast, showLoadingToast, showSuccessToast } from "./ui/toast";
import { toast } from "sonner";
import {
  useAddItemCart,
  useCheckout,
} from "@/http/services/cart/cart-post-service";

export function CartSheet() {
  const { data: cartItems } = useGetCart();
  const { mutate: deleteCart } = useRemoveCart();
  const { mutate: deleteCartItem } = useRemoveItemCart();
  const { mutate: createCartItem } = useAddItemCart();
  const { mutate: createCheckout } = useCheckout();

  const totalItems = cartItems?.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  async function handleDelete(id: number) {
    const loadingToastId = showLoadingToast("Removing product...");
    await deleteCart(id, {
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        showSuccessToast(`Product removed sucessfully`);
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        showErrorToast(String(error) || "Error, try again later");
      },
    });
  }

  async function handleDeleteItem(id: number) {
    const loadingToastId = showLoadingToast("Removing product...");
    await deleteCartItem(id, {
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        showSuccessToast(`Product removed sucessfully`);
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        showErrorToast(String(error) || "Error, try again later");
      },
    });
  }

  async function handleCreate(id: number) {
    const loadingToastId = showLoadingToast("Adding product...");
    await createCartItem(id, {
      onSuccess: (result) => {
        toast.dismiss(loadingToastId);
        showSuccessToast(result.message || `Product added sucessfully`);
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        showErrorToast(String(error) || "Error, try again later");
      },
    });
  }

  async function handleCheckout() {
    const loadingToastId = showLoadingToast("Doing checkout...");
    await createCheckout(undefined, {
      onSuccess: (result) => {
        toast.dismiss(loadingToastId);
        showSuccessToast(result.message || `Checkout sucessfully`);
      },
      onError: (error) => {
        toast.dismiss(loadingToastId);
        showErrorToast(String(error) || "Error, try again later");
      },
    });
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />

          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0">
            {totalItems}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-5">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            {!cartItems
              ? "Cart empty"
              : `${totalItems} ${totalItems === 1 ? "item" : "itens"} in cart`}
          </SheetDescription>
        </SheetHeader>

        {!cartItems ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>Add products to the cart</p>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4 -mr-4">
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="truncate">{item.product.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={() => handleDelete(item.product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground">
                        $ {item.product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDeleteItem(item.product.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCreate(item.product.id)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <span className="ml-auto">
                          $ {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            <SheetFooter className="flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span>Total:</span>
                <span>$ {totalPrice?.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Checkout
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
