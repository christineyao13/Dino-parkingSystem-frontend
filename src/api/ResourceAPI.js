import axios from 'axios';
import * as url from '../constant/constant'
import {message} from 'antd';

const ResourceAPi = {
    apiUrl: url.URL,
    getAllEmployees(successCallBack) {
        const token = localStorage.getItem("token")
        axios.defaults.headers.common['Authorization'] = token;
        axios
            .get(`${this.apiUrl}/users`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                window.location.href = "/";
                console.log(error);
            });
    },

    addEmployee(employee, successCallBack) {
        axios.
            post(`${this.apiUrl}/users`, employee)
            .then(function (response) {
                console.log(response.data)
                successCallBack(response.status,response.data.password);
            })
            .catch(function (error) {
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                
                console.log(error);
            })
    },

    modifyEmployeeInfo(employee, successCallBack) {
        axios.
            put(`${this.apiUrl}/users/${employee.id}`, employee)
            .then(function (response) {
                successCallBack(response.status);
            })
            .catch(function (error) {
                successCallBack(error.response.status);
                console.log(error);
            })
    },

    updateEmployeeStatus(employeeId, employeeStatus, successCallBack) {
        axios({
            method: 'patch',
            url: `${this.apiUrl}/users/${employeeId}`,
            headers: { 'content-type': 'application/json' },
            data: {
                status: employeeStatus
            }
        })
            .then(function (response) {
                successCallBack();
                message.success('操作成功！');
            })
            .catch(function (error) {
                message.error(`操作失败！ 原因：${error.response.status, error.response.data.cause}`);
            })
    },

    getAllParkingLots(successCallBack) {
        const token = localStorage.getItem("token")
        axios.defaults.headers.common['Authorization'] = token;
        axios
            .get(`${this.apiUrl}/parkingLots`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                console.log(error.response.status);
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                console.log(error);
            });
    },

    getAllOrders(successCallBack) {
        const token = localStorage.getItem("token")
        axios.defaults.headers.common['Authorization'] = token;
        axios
            .get(`${this.apiUrl}/orders`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                console.log(error);
            });
    },

    getAllParkingBoys(successCallBack) {
        const token = localStorage.getItem("token")
        axios.defaults.headers.common['Authorization'] = token;
        axios
            .get(`${this.apiUrl}/parkingBoys`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                console.log(error);
            });
    },

    getActiveParkingBoys(successCallBack) {
        const token = localStorage.getItem("token")
        axios.defaults.headers.common['Authorization'] = token;
        axios
            .get(`${this.apiUrl}/parkingBoys?canAppoint=true`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                console.log(error);
            });
    },

    dispatchOrder(orderId, parkingBoyId, successCallBack) {
        axios
            .put(`${this.apiUrl}/orders/${orderId}`, {
                "status": "waitPark",
                "parkingBoyId": parkingBoyId
            })
            .then(function (response) {
                successCallBack(response.status);
            })
            .catch(function (error) {
                successCallBack(error.response.status)
            });
    },

    getNoManagedParkingLots(successCallBack) {
        axios
            .get(`${this.apiUrl}/parkingLots/?noParkingBoy=true`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                console.log(error);
            });
    },

    getParkingLotsByParkingBoyId(id, successCallBack) {
        axios
            .get(`${this.apiUrl}/parkingBoys/${id}/parkingLots`)
            .then(function (response) {
                successCallBack(response.data);
            })
            .catch(function (error) {
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                console.log(error);
            });
    },

    addParkingLot(parkingLot, successCallBack) {
        axios.
            post(`${this.apiUrl}/parkingLots`, parkingLot)
            .then(function (response) {
                successCallBack(response.status);
            })
            .catch(function (error) {
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                console.log(error);
            })
    },

    modifyParkingLotInfo(parkingLot, successCallBack) {
        axios.
            put(`${this.apiUrl}/parkingLots/${parkingLot.id}`, parkingLot)
            .then(function (response) {
                successCallBack(response.status);
            })
            .catch(function (error) {
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                console.log(error);
            })
    },

    changeParkingLotStatus(parkingLotId, parkingLotStatus, successCallBack) {
        axios({
            method: 'patch',
            url: `${this.apiUrl}/parkingLots/${parkingLotId}`,
            headers: { 'content-type': 'application/json' },
        })
            .then(function (response) {
                successCallBack(response.status);
            })
            .catch(function (error) {
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                console.log(error);
            })
    },
    searchEmployees(optionValue,value,successCallBack){
        axios
            .get(`${this.apiUrl}/users?${optionValue}=${value}`,optionValue,value)
            .then(function (response) {
                console.log("ok");
                successCallBack(response.data);
            })
            .catch(function (error) {
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                console.log(error);
            });

        },
    searchParkingLots(optionValue,value,successCallBack){
        axios
            .get(`${this.apiUrl}/parkingLots?${optionValue}=${value}`,optionValue,value)
            .then(function (response) {
                console.log("ok");
                successCallBack(response.data);
            })
            .catch(function (error) {
                if(error.response.status=='403'){
                    window.location.href = "/";
                }
                console.log(error);
            });

        },
        searchParkingBoys(optionValue,value,successCallBack){
            axios
                .get(`${this.apiUrl}/users?${optionValue}=${value}`,optionValue,value)
                .then(function (response) {
                    console.log("ok");
                    successCallBack(response.data);
                })
                .catch(function (error) {
                    if(error.response.status=='403'){
                        window.location.href = "/";
                    }
                    console.log(error);
                });
    
            },
            searchOrders(optionValue,value,successCallBack){

                axios
                    .get(`${this.apiUrl}/orders?${optionValue}=${value}`,optionValue,value)
                    .then(function (response) {
                        console.log("ok");
                        console.log(response.data)
                        successCallBack(response.data);
                    })
                    .catch(function (error) {
                        if(error.response.status=='403'){
                            window.location.href = "/";
                        }
                        console.log(error);
                    });
        
                },

    manageParkingBoysParkingLots(id, operation, parkingLotsIds, successCallBack) {
        axios
            .put(`${this.apiUrl}/parkingBoys/${id}/parkingLots`, {
                operation: operation,
                parkingLots: parkingLotsIds
            })
            .then(function (response) {
                successCallBack(response.data);
                message.success('操作成功！');
            })
            .catch(function (error) {
                console.log(error);
                message.error('操作失败！');
            });
    },
}

export default ResourceAPi;