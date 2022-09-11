import { Dialog, Pane, Paragraph } from "evergreen-ui";
import "./confirmation.scss";

const Confirmation = ({
  intent = "primary",
  title = "Are you sure?",
  onClose,
  onConfirm,
  children,
}) => {
  return (
    <Dialog
      isShown={true}
      title={title}
      width={360}
      intent={intent}
      confirmLabel="Confirm"
      onCloseComplete={onClose}
      onConfirm={onConfirm}
    >
      <Pane width="100%">
        <Paragraph>{children}</Paragraph>
      </Pane>
    </Dialog>
  );
};

export default Confirmation;
