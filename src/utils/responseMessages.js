function successMessage(status, message, data) {
  return { status, message, data };
}
function errorMessage(status, error) {
  return { status, error };
}

module.exports = { successMessage, errorMessage };
