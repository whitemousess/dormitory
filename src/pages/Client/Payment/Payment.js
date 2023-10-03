import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Payment.module.scss';
import * as contractService from '~/services/contractService';
import * as billService from '~/services/billService';
import * as billElectricService from '~/services/billElectricService';
import { PayIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Payment() {
    const [dataContract, setDataContract] = useState([]);
    const [dataService, setDataService] = useState([]);
    const [dataElectric, setDataElectric] = useState([]);

    useEffect(() => {
        billElectricService.getElectricRoom().then((electric) => setDataElectric(electric));
        contractService.getContractStudent().then((contractStudent) => setDataContract(contractStudent));
        billService.getServiceUser().then((service) => setDataService(service));
    }, []);

    const totalRoom = () => {
        let totalPrice = 0;
        if (dataContract && dataContract.room_id) {
            totalPrice = parseInt(dataContract.room_id.price);
            return totalPrice;
        } else {
            return 0;
        }
    };

    const totalService = () => {
        let totalPrice = 0;
        if (dataService) {
            dataService.map((data) => {
                totalPrice += parseInt(data.id_service.price);
            });
            return totalPrice;
        } else {
            return 0;
        }
    };

    const totalElectric = () => {
        if (
            dataElectric &&
            dataElectric.e_last !== null &&
            dataElectric.w_last !== null &&
            dataElectric.price_per_e !== null &&
            dataElectric.price_per_w !== null
        ) {
            const totalElectric = dataElectric.e_last - dataElectric.e_first;
            const totalWater = dataElectric.w_last - dataElectric.w_first;
            const priceElectric = isNaN(dataElectric.price_per_e) ? 0 : totalElectric * dataElectric.price_per_e;
            const priceWater = isNaN(dataElectric.price_per_w) ? 0 : totalWater * dataElectric.price_per_w;

            return priceElectric + priceWater;
        } else {
            return 0; // hoặc giá trị mặc định khác nếu bạn muốn
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <strong className={cx('title')}>Tổng hợp</strong>
            </div>
            <div>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>Khoản thu</th>
                            <th>Tiền phòng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalRoom() > 0 && (
                            <tr>
                                <td>Tiền phòng</td>
                                <td>{totalRoom()}</td>
                            </tr>
                        )}
                        {totalElectric() > 0 && (
                            <tr>
                                <td>Điện nước</td>
                                <td>{totalElectric()}</td>
                            </tr>
                        )}

                        {totalService() > 0 && (
                            <tr>
                                <td>Dịch vụ</td>
                                <td>{totalService()}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <span className={cx('priceBuy')}>
                Tổng tiền : {totalRoom() + totalElectric() + totalService()}
                <button className={cx('Btn')}>
                    Pay
                    <PayIcon />
                </button>
            </span>
        </div>
    );
}

export default Payment;
