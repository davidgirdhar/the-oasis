import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {

  const {isCheckingOut, updateCheckout} = useCheckout();

  return (
    <Button variation="primary" size="small" disabled={isCheckingOut} onClick={()=>updateCheckout(bookingId)}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
