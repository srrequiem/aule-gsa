import ServicesFee from "./servicesFee";
import Account from "./account";

export default interface Reminder {
    servicesFee: ServicesFee,
    account: Account
}