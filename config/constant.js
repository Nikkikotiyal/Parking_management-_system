const SYSTEM_FAILURE = "Something failed.";
const INVALID_USER = "No user registered with given Id";
const INACTIVE_ACCOUNT = "Account is not active. Please get in touch with app admin.";
const REPORT_REMOVED = "Report has been successfully removed";
// middleware auth
const MIDDLEWARE_AUTH_CONSTANTS = {
  ACCESS_DENIED: "Access denied. No authorization token provided",
  RESOURCE_FORBIDDEN: "You don't have access to the request resource.",
  INVALID_AUTH_TOKEN: "Invalid token",
};

// admins.js
const ADMIN_CONSTANTS = {
  INVALID_EMAIL: "Invalid email or password.",
  NOTIFICATION_SUCCESS: "Notificaiton submitted successfully",
};

// auth.js
const AUTH_CONSTANTS = {
  INVALID_USER: INVALID_USER,
  INVALID_CREDENTIALS: "Invalid email or password",
  INVALID_PASSWORD: "You have entered incorrect old password. Please try again with valid password.",
  INACTIVE_ACCOUNT: INACTIVE_ACCOUNT,
  CHANGE_PASSWORD_REQUEST_SUCCESS: "Password recovery link has been sent to your registered email.",
  CHANGE_PASSWORD_REQUEST_EMAIL_FAILURE: "Email sending failed due to some application issue.",
  INVALID_EMAIL: "The email provided is not registered. Please sign up to continue.",
  INVALID_RECOVERY_LINK: "Password link expired or not valid.",
  PASSWORD_CHANGE_SUCCESS: "Password changed successfully",
  INVALID_OTP: "Invalid OTP passed",
  INVALID_MOBILE: "No user found with given mobile number.",
  MOBILE_REQUIRED: '"mobile" is required',
  OTP_TOKEN_REQUIRED: '"otpToken" is required',
  SYSTEM_FAILURE: SYSTEM_FAILURE,
};

// OTP.js
const OTP_CONSTANTS = {
  INVALID_USER: INVALID_USER,
  NO_USER_REGISTERED_ERROR: "No user registered with given phone number",
  DUPLICATE_MOBILE_NUMBER: "Mobile number entered is already registered. Please try to login.",
  DUPLICATE_EMAIL: "Email entered is already registered. Please try to login.",
  INVALID_MOBILE_NUMBER: "Invalid mobile number entered. Please provide valid US mobile number.",
  EMAIL_SENDING_FAILED: "Email sending failed due to some application issue",
  OTP_GENERATED_SUCCESSFULLY: "Verification code generated successfully",
  OTP_VERIFIED: "Verification code verified for new user",
  INVALID_OTP: "Invalid Code",
  OTP_MAX_LIMIT_ERROR: "Max attempts to verify code breached",
  OTP_EXPIRED: "Verification code expired",
  OTP_VERIFIED_NEW_USER: "Verification code verified for new user",
};

// users.js
const USER_CONSTANTS = {
  INACTIVE_ACCOUNT: INACTIVE_ACCOUNT,
  INVALID_USER: INVALID_USER,
  EMAIL_ALREADY_EXISTS: "Email already registered",
  MOBILE_EMAIL_ALREADY_EXISTS: "Mobile and email are already registered",
  INVALID_MOBILE_NUMBER: "Invalid mobile number entered. Please provide valid US mobile number.",
  INVALID_MOBILE: "No user found with given mobile number.",
  INVALID_PASSWORD: "You have entered incorrect old password. Please try again with valid password.",
  MOBILE_ALREADY_EXISTS: "Mobile number already registered",
  PASSWORD_CHANGE_SUCCESS: "Password changed successfully",
  USERNAME_ALREADY_EXISTS: "UserName already registered",
  OTP_MISSING_UPDATE: "No OTP passed. OTP is required for update.",
  ALL_CHECKS_VALID: "All check are valid. Proceed for OTP",
  INVALID_OTP: "Invalid OTP passed",
  OTP_MISSING: "No OTP passed. OTP is required for registration.",
  LOGGED_OUT: "Logged Out successfully",
  VERIFICATION_SUCCESS: "Continue for OTP.",
  USER_REPORTED: "Thank you for the initiative you took.Team will soon look for the user you have reported.Cheers!",
  REPORT_REMOVED: REPORT_REMOVED,
};
//card
const CARD_CONSTANTS = {
  INVALID_USER: INVALID_USER,
  INVALID_CARD: "Card with given Id not found",
  SET_DEFAULT: "Card set as default",
  CARD_REQUIRED: "cardId is mandatory parameter",
  CARD_ADDING_FAILED: "Card addition failed.",
  CARD_DELETE_SUCCESS: "Card removed successfully",
};

const BOOKING_CONSTANTS = {
  INVALID_USER: INVALID_USER,
  INVALID_BOOKING: "Booking with given Id not found.",
  FAILED_BOOKING: "Payment is not going through for this booking. Please get in touch with app admin.",
  INVALID_CARD: "Card with given Id not found.",
  PAYMENT_FAILED: "Payment Failed. Please check your payment method and try agian.",
  SLOT_BOOKED: "This slot already booked.",
  CANCEL_SUBMIT_SUCCESS: "Booking Canceled Successfully.",
  UPDATE_BOOKING: "Booking updated successfully.",
  REFUND_SUBMIT_SUCCESS: "Refund status for the booking updated successfully.",
  CANCEL_CHARGES: "You will be Charged a $30 cancellation fee. Are you sure you would like to Cancel this Request?",
  ALREADY_BOOKING: "You have already booking at the same time",
};
// category
// const CATEGORY_CONSTANTS = {
//   CATEGORY_ALREADY_EXISTS: "Category with given name already exists",
//   CATEGORY_NOT_FOUND: "Category not found",
//   CATEGORY_UPDATED: "Category updated successfully",
//   CATEGORY_DELETED: "Category deleted successfully",
// };

// project
// const PROJECT_CONSTANTS = {
//   PROJECT_NOT_FOUND: "Project with given Id not found",
//   PROJECT_UPDATED: "Project updated successfully",
//   PROJECT_DELETED: "Project deleted successfully",
//   PROJECT_REPORTED: "Thank you for the initiative you took.Team will soon look for the project you have reported.Cheers!",
//   REPORT_REMOVED: REPORT_REMOVED,
// };

// funding
// const FUNDING_CONSTANTS = {
//   FUNDING_NOT_FOUND: "Funding with given Id not found",
//   FUNDING_UPDATED: "Funding updated successfully",
//   FUNDING_DELETED: "Funding deleted successfully",
//   FUNDING_REPORTED: "Thank you for the initiative you took.Team will soon look for the funding you have reported.Cheers!",
//   REPORT_REMOVED: REPORT_REMOVED,
// };

// event
// const EVENT_CONSTANTS = {
//   EVENT_NOT_FOUND: "Event with given Id not found",
//   EVENT_UPDATED: "Event updated successfully",
//   EVENT_DELETED: "Event deleted successfully",
//   EVENT_APPROVAL: "Your request has been submitted for the approval.Thank You.Regards:Tbhc Team",
//   NOT_AUTHORIZED: "You are not authorized to delete this event",
//   EVENT_REPORTED: "Thank you for the initiative you took.Team will soon look for the event you have reported.Cheers!",
//   REPORT_REMOVED: REPORT_REMOVED,
// };

// const ACTIVITY_CONSTANTS = {
//   INVALID_ID: "No Activity with given ID found",
// };

const CALL_CONSTANTS = {
  ROOMSID_MANDATORY: "roomSid is mandatory query param",
  ROOMNAME_MANDATORY: "roomName is mandatory query param",
  OTHERUSERID_MANDATORY: "otherUserId is mandatory query param",
  INVALID_USER: "invalid user",
  USER_NOT_AVAILABLE: "User is not available to accept your call",
  USER_NOTIF_ISSUE: "Calls cannot be connected due to an issue on user end.",
  FCM_SUBMIT_SUCCESS: "FCM submitted successfully",
  NO_DEVICE_TOKEN_FOUND: "No device token found in system",
  CELBRITYID_MANDATORY: "celebrityId is mandatory param",
  USERID_MANDATORY: "userId is mandatory query param",
  BOOKINGID_MANDATORY: "bookingId is mandatory query param",
  ROOM_CREATION_FAILED: "Your video call cannot be connected due to a techincal issue.",
  CALL_END_SUCCESS: "Call ended successfully",
  USER_UNAVIALABLE: "User unavialabe.",
};

module.exports.SYSTEM_FAILURE = SYSTEM_FAILURE;
module.exports.MIDDLEWARE_AUTH_CONSTANTS = MIDDLEWARE_AUTH_CONSTANTS;
module.exports.AUTH_CONSTANTS = AUTH_CONSTANTS;
module.exports.ADMIN_CONSTANTS = ADMIN_CONSTANTS;
module.exports.OTP_CONSTANTS = OTP_CONSTANTS;
module.exports.USER_CONSTANTS = USER_CONSTANTS;
// module.exports.ACTIVITY_CONSTANTS = ACTIVITY_CONSTANTS;
// module.exports.CATEGORY_CONSTANTS = CATEGORY_CONSTANTS;
module.exports.CARD_CONSTANTS = CARD_CONSTANTS;
// module.exports.PROJECT_CONSTANTS = PROJECT_CONSTANTS;
// module.exports.FUNDING_CONSTANTS = FUNDING_CONSTANTS;
// module.exports.EVENT_CONSTANTS = EVENT_CONSTANTS;
module.exports.BOOKING_CONSTANTS = BOOKING_CONSTANTS;
module.exports.CALL_CONSTANTS = CALL_CONSTANTS;
