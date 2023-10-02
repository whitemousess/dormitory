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
    const [mergedData, setMergedData] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        contractService.getContractStudent().then((contractStudent) => {
            setDataContract(contractStudent);
            if (contractStudent) {
                billElectricService.getElectricRoom({room_id: contractStudent.room_id._id}).then((electric) => setDataElectric(electric));
            }
        });
        billService.getServiceUser().then((service) => setDataService(service));
    }, []);

    useEffect(() => {
        // Tạo đối tượng để lưu trữ dữ liệu gộp và tổng tiền
        const mergedDataObject = {};

        // Tính tổng tiền và gộp dữ liệu
        let total = 0;
        // Cộng giá tiền phòng nếu có
        if (dataContract && dataContract.room_id) {
            total += parseFloat(dataContract.room_id.price);
        }
        
        dataService.forEach((data) => {
            const serviceName = data.id_service.name;
            const servicePrice = parseFloat(data.id_service.price);

            if (!mergedDataObject[serviceName]) {
                mergedDataObject[serviceName] = 0;
            }

            mergedDataObject[serviceName] += servicePrice;
            total += servicePrice;
        });

        // Cập nhật state với dữ liệu gộp và tổng tiền
        setMergedData(mergedDataObject);
        setTotalPrice(total);
    }, [dataService]);

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
                        {dataContract && dataContract.room_id && (
                            <tr>
                                <td>Tiền phòng</td>
                                <td>{dataContract.room_id.price}</td>
                            </tr>
                        )}
                        {totalElectric() > 0 && (
                            <tr>
                                <td>Điện nước</td>
                                <td>{totalElectric()}</td>
                            </tr>
                        )}

                        {Object.entries(mergedData).map(([serviceName, servicePrice]) => (
                            <tr key={serviceName}>
                                <td>Dịch vụ</td>
                                <td>{servicePrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <span className={cx('priceBuy')}>
                Tổng tiền : {totalPrice + totalElectric()}
                <button className={cx('Btn')}>
                    Pay
                    <PayIcon />
                </button>
            </span>
        </div>
    );
}

export default Payment;
