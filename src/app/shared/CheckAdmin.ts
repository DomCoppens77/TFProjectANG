export function CheckAdmin() {
        let isAdmin : boolean;

        isAdmin = false;
        isAdmin = 0 == JSON.parse(window.atob(localStorage.getItem("APITOKEN").split('.')[1])).role;
        return isAdmin;

}

