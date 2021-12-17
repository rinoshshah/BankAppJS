class Bank {

    validateAccountNumber(acno) {
        return acno in localStorage ? true : false
    }

    accountCreate() {
        let account_number = bk_acno.value;
        let email = bk_email.value;
        let phone = bk_phone.value;
        let password = bk_pwd.value;
        let balance = 2000;
        let transactions = [];
        let account = {
            account_number,
            email,
            phone,
            password,
            balance,
            transactions
        }
        if (this.validateAccountNumber(account_number)) {

            alert("Already Exists !")

        }
        else {

            localStorage.setItem(account_number, JSON.stringify(account))
            alert("account Created")
            window.location.href = "./login.html";


        }
    }


    authenticate(acno, password) {
        if (this.validateAccountNumber(acno)) {
            let user = JSON.parse(localStorage.getItem(acno))
            if (user.password == password) {
                return 1;
            }
            else {
                return 0;
            }
        }
        else {
            return -1;

        }

    }

    login() {
        let username = bk_username.value
        let password = bk_password.value
        let user = this.authenticate(username, password)
        if (user === 1) {
            sessionStorage.setItem("user", username)
            alert("access granted")
            window.location.href = "./hom.html"

        }
        else {
            alert("access denied")
        }

    }

    logout() {
        if ("user" in sessionStorage) {
            sessionStorage.removeItem("user")
            window.location.href = "./login.html"
        }
        else {
            alert("Invalid session u must login first")
        }
    }

    getUser() {
        let user = sessionStorage.getItem("user")
        let element = document.createElement("div")
        element.innerHTML = `<h1>Welcome User ${user}</h1>`
        document.querySelector("body").append(element)
    }
    getUserDataFormLocalStorage(acno) {
        return JSON.parse(localStorage.getItem(acno))
    }
    balanceEnquiry() {
        let loggeduser = sessionStorage.getItem("user")
        let loggeduserdata = this.getUserDataFormLocalStorage(loggeduser)
        // console.log((loggeduserdata.balance));
        let bal = loggeduserdata.balance
        return bal

    }
    fundTransfer() {
        let payee_acno = sessionStorage.getItem("user")
        let to_acno = bk_toacno.value
        let confirm_toacno = bk_ctoacno.value
        let amount = Number(bk_amt.value)
        if (to_acno == confirm_toacno) {
            if (this.validateAccountNumber(to_acno)) {
                let aval_bal = this.balanceEnquiry()
                if (amount > aval_bal) {
                    alert("Insufficient Balance")
                }
                else {
                    let payee=this.getUserDataFormLocalStorage(payee_acno)
                    let to_account=this.getUserDataFormLocalStorage(to_acno)
                    let bal=aval_bal-amount
                    payee.balance=bal
                    localStorage.setItem(payee_acno,JSON.stringify(payee))

                    let to_cur_bal=Number(to_account.balance)
                    to_cur_bal+=amount
                    to_account.balance=to_cur_bal
                    localStorage.setItem(to_acno,JSON.stringify(to_account))
                    

                    alert("Fund Transfer Successful")
                    // transactions+=[`to: ${to_account}, Amount: ${amount}, Balance:${bal}`]
                }

            }
            else{
                alert("invalid Account number")
            }

        }
        else {
            alert("Account Number Mismatch")
        }

    }
    // paymentHistory(){
    //     let to_acno=bk_toacno.value
    //     let amount= bk_amt.value
    //     let balance=this.balanceEnquiry("user")
    //     if ("user"==1) {
    //         transactions+=[`to: ${to_acno}, Amount: ${amount}, Balance:${balance}`]
            
    //     }

    // }
    // paymentHistory(){
    //     tra
    // }
    

}

var bank = new Bank()





























