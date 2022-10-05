import toastr from "toastr";

export function alertNewTodo() {
  toastr.clear();
  toastr.success("Todo created successfully!!", "New todo");
}

export function alertCreatingTodo() {
  toastr.clear();
  toastr.info("Creating todo!!", "Processing ...");
}

export function alertDeletedTodo() {
  toastr.clear();
  toastr.success("Todo deleted successfully", "Deleted todo");
}

export function alertDeletingTodo() {
  toastr.clear();
  toastr.info("Creating todo!!", "Processing ...");
}

export function alertUpdatedTodo() {
  toastr.clear();
  toastr.success("Todo updated successfully!!", "Success!!");
}

export function alertUpdatingTodo() {
  toastr.clear();
  toastr.info("Updating todo!!", "Processing ...");
}

export function alertError(msg) {
  toastr.clear();
  toastr.error(msg, "Error!!");
}
