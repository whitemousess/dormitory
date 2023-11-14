import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import StripeCheckout from 'react-stripe-checkout';

import style from './ModalPayment.module.scss';
import * as payMentService from '~/services/paymentService';
import * as contractService from '~/services/contractService';
import * as billRoomService from '~/services/billRoomService';
import * as billService from '~/services/billService';
import * as billElectricService from '~/services/billElectricService';
import { MomoIcon, PayIcon } from '~/components/Icons';

const cx = classNames.bind(style);

function ModalPayment({ totalPrice, data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [roomId, setRoomId] = useState('');
    const publishableKeys = process.env.REACT_APP_PUBLISHKEY;

    const convertUsdToVnd = (totalPrice / 24368).toFixed(2);
    const priceForStripe = convertUsdToVnd * 100;

    useEffect(() => {
        contractService.getContractStudent().then((contract) => setRoomId(contract.room_id._id));
    }, []);

    const successPayment = () => {
        if (data.dataBillRoom) {
            billRoomService.painBill({ roomId: roomId, data: { status: 1 } }).then((bill) => console.log(bill));
        }
        if (data.dataElectric) {
            billElectricService
                .editElectric({ bill_id: data.dataElectric._id, data: { status: 1 } })
                .then((electric) => console.log(electric));
        }
        if (data.dataService.length > 0) {
            billService.successService({ roomId: roomId }).then((service) => console.log(service));
        }
    };

    const payNow = (token) => {
        payMentService
            .payStripe({ token: token, amount: priceForStripe })
            .then((res) => {
                if (res.status === 200) {
                    successPayment();
                } else {
                    console.log(res);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <button className={cx('Btn')} onClick={() => setIsOpen(true)}>
                Pay
                <PayIcon />
            </button>
            {isOpen ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-3/4 lg:w-2/4 my-6 mx-auto">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Phương thức thanh toán</h3>
                                    <button
                                        className="p-3 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="">x</span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <StripeCheckout
                                        stripeKey={publishableKeys}
                                        label="Thanh toán"
                                        name="Thanh toán phí"
                                        billingAddress
                                        shippingAddress
                                        amount={totalPrice * 100}
                                        description={`Số tiền thanh toán :${totalPrice} VND`}
                                        token={payNow}
                                    >
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="w-full mb-4 h-[84px] bg-[#675dff] rounded-2xl focus:outline-none text-white font-bold"
                                        >
                                            <p>Thanh toán với Stripe</p>
                                        </button>
                                    </StripeCheckout>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="flex justify-center items-center w-full h-[84px] bg-[#FFD6E7] rounded-2xl text-[#727272] focus:outline-none font-bold"
                                    >
                                        <MomoIcon />
                                        <p className="ml-4">Thanh toán với Momo</p>
                                    </button>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button className="btn btn-danger h-[42px] w-1/4" onClick={() => setIsOpen(false)}>
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default ModalPayment;
