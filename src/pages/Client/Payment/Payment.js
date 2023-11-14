import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Payment.module.scss';
import * as billRoomService from '~/services/billRoomService';
import * as billService from '~/services/billService';
import * as billElectricService from '~/services/billElectricService';
import ModalPayment from './ModalPayment';

const cx = classNames.bind(styles);

function Payment() {
    const [dataBillRoom, setDataBillRoom] = useState([]);
    const [dataService, setDataService] = useState([]);
    const [dataElectric, setDataElectric] = useState([]);
    const [priceEW, setPriceEW] = useState([]);
    const [priceRoom, setPriceRoom] = useState('');
    const [priceService, setPriceService] = useState([]);

    useEffect(() => {
        billElectricService
            .getElectricRoom()
            .then((electric) => setDataElectric(electric && electric.electric_water_id));
        billRoomService.getOneBill().then((BillRoom) => setDataBillRoom(BillRoom));
        billService.getServiceUser().then((service) => setDataService(service));
    }, []);

    useEffect(() => {
        setPriceEW(
            dataElectric
                ? (dataElectric.e_last - dataElectric.e_first) * dataElectric.price_per_e +
                      (dataElectric.w_last - dataElectric.w_first) * dataElectric.price_per_w
                : 0,
        );

        setPriceRoom(
            dataBillRoom &&
                dataBillRoom.status === 0 &&
                dataBillRoom.room_id &&
                dataBillRoom.room_id.status === 0 &&
                dataBillRoom.room_id.price
                ? dataBillRoom.room_id.price
                : 0,
        );

        const bill_service = dataService.map((service) => {
            let price = service.service_id.price;
            if (service.status === 1) {
                return 0;
            }
            return price;
        });
        setPriceService(bill_service.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    }, [dataElectric, dataBillRoom, dataService]);

    const checkData = {
        dataBillRoom,
        dataService,
        dataElectric,
    };

    const totalPrice = () => {
        return priceRoom + priceService + priceEW;
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <strong className={cx('title')}>Tổng hợp</strong>
            </div>
            {priceRoom || priceService || priceEW ? (
                <>
                    <div>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <th>Khoản thu</th>
                                    <th>Giá tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {priceRoom > 0 && (
                                    <tr>
                                        <td>Tiền phòng</td>
                                        <td>{priceRoom}</td>
                                    </tr>
                                )}
                                {priceEW > 0 && (
                                    <tr>
                                        <td>Điện nước</td>
                                        <td>{priceEW}</td>
                                    </tr>
                                )}

                                {priceService > 0 && (
                                    <tr>
                                        <td>Dịch vụ</td>
                                        <td>{priceService}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <span className={cx('priceBuy')}>
                        Tổng tiền : {totalPrice()}
                        <ModalPayment data={checkData} totalPrice={totalPrice()} />
                    </span>
                </>
            ) : (
                <div>Chưa có khoản nào cần thanh toán</div>
            )}
        </div>
    );
}

export default Payment;
