import { format } from "date-fns"

export async function formatDate(date: string) {
    return format(date, "yyyy-MM-dd")
}


//format date dd-mm-yyyy
export function formatDateDDMMYYYY(date: string) {
    const [day, month, year] = date.split("-")
    return `${day}-${month}-${year}`
}
