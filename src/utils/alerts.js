import toastr from "toastr";

export function alertNewTodo() {
  toastr.success("Todo created successfully!!", "New todo");
}

export function alertCreatingTodo() {
  toastr.info("Creating todo!!", "Processing ...");
}

export function alertDeletedTodo() {
  toastr.success("Todo deleted successfully", "Deleted todo");
}

export function alertDeletingTodo() {
  toastr.info("Creating todo!!", "Processing ...");
}

export function alertUpdatedTodo() {
  toastr.success("Todo updated successfully!!", "Success!!");
}

export function alertUpdatingTodo() {
  toastr.info("Updating todo!!", "Processing ...");
}

export function alertError(msg) {
  toastr.error(msg, "SOmthing happend!!");
}
