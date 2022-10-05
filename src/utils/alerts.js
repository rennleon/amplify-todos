import toastr from "toastr";

export function alertNewTodo() {
  toastr.clear();
  toastr.success("Todo created successfully!!", "New todo");
}

export function alertCreatingTodo() {
  toastr.clear();
  toastr.info("", "Creating todo...");
}

export function alertDeletedTodo() {
  toastr.clear();
  toastr.success("Todo deleted successfully", "Delete todo");
}

export function alertDeletingTodo() {
  toastr.clear();
  toastr.info("", "Deleting todo ...");
}

export function alertUpdatedTodo() {
  toastr.clear();
  toastr.success("Todo updated successfully!!", "Update todo");
}

export function alertUpdatingTodo() {
  toastr.clear();
  toastr.info("", "Updating todo ...");
}

export function alertError(msg) {
  toastr.clear();
  toastr.error(msg, "Error!!");
}
