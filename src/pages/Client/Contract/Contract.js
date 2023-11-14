import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import * as contractService from '~/services/contractService';
import styles from './Contract.module.scss';

const cx = classNames.bind(styles);

function Contract() {
    const [dataContract, setDataContract] = useState([]);

    useEffect(() => {
        contractService.getContractStudent().then((contract) => {
            setDataContract(contract);
        });
    }, []);

    // format date
    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
        const year = date.getFullYear();
        return `Ngày ${day} tháng ${month} năm ${year}`;
    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {dataContract && dataContract.user_id && dataContract.room_id && dataContract.student_id ? (
                    <>
                        <h1 className={cx('header')}>TRƯỜNG ĐẠI HỌC TÀI NGUYÊN VÀ MÔI TRƯỜNG HÀ NỘI</h1>
                        <h2 className='text-xl font-semibold'>HỢP ĐỒNG THUÊ CHỖ Ở NỘI TRÚ</h2>
                        <p className={cx('date')}>
                            {formatDate(new Date(dataContract.createdAt))} .<br /> Tại Trường : Đại học Tài nguyên và
                            Môi trường Hà Nội
                        </p>
                        <h3 className='text-4xl font-semibold'>Hai bên gồm</h3>
                        <h3 className='text-3xl font-semibold'>BÊN CHO THUÊ (Bên A):</h3>
                        <p className={cx('p')}>
                            Trường Đại học Tài nguyên và Môi trường Hà Nội
                            <br />
                            Đại diện: {dataContract.user_id.fullName}
                            <br />
                            Số điện thoại: {dataContract.user_id.phone}
                        </p>
                        <h3 className={cx('h3')}>BÊN THUÊ CHỖ Ở (Bên B):</h3>
                        <p className={cx('p')}>
                            Họ và tên sinh viên: {dataContract.student_id.fullName}
                            <br />
                            Mã SV: {dataContract.student_id.user_id} <br />
                            Giới tính: {dataContract.student_id.gender === 0 ? 'Nam' : ' Nữ'}
                            <br />
                            Ngày sinh: {dataContract.student_id.dob}
                            <br />
                            Số điện thoại: {dataContract.student_id.phone} <br />
                            Email: {dataContract.student_id.email}.
                            <br />
                            Hộ khẩu thường trú: {dataContract.student_id.address}.
                        </p>
                        <p className={cx('p')}>
                            Bên A được sự ủy quyền của Hiệu trưởng Trường Đại học Tài nguyên và Môi trường Hà Nội, cùng
                            Bên B, thống nhất ký kết Hợp đồng cho thuê chỗ ở nội trú tại Ký túc xá Trường Đại học Tài
                            nguyên và Môi trường Hà Nội với các điều khoản sau:
                        </p>
                        <h3 className={cx('h3')}>Điều 1:</h3>
                        <p className={cx('p')}>
                            Bên A đồng ý cho Bên B thuê 01 chỗ ở nội trú tại phòng số:{' '}
                            <strong>{dataContract.room_id.room_name}</strong> Ký túc xá Trường Đại học Tài nguyên và Môi
                            trường Hà Nội Bên B được phép sử dụng các tài sản do nhà trường trang bị tại phòng ở cũng
                            như các phòng sinh hoạt tập thể thuộc khuôn viên Ký túc xá theo Quy chế tổ chức & hoạt động,
                            các quy định và nội quy của Ký túc xá.
                        </p>
                        <h3 className={cx('h3')}>Điều 2: Giá cả, thời gian và phương thức thanh toán.</h3>
                        <p className={cx('p')}>
                            2.1. Đơn giá cho thuê: {dataContract.room_id.price} tháng.
                            <br />
                            2.2. Thời gian cho thuê: 01 học kỳ 05 tháng tính từ ngày {dataContract.date_start} đến ngày{' '}
                            {dataContract.date_end}.
                            <br />
                            2.3. Phương thức thanh toán: Bên B thanh toán cho Bên A tiền thuê chỗ ở bằng tiền mặt 1 lần
                            tại phòng Quản lý Ký túc xá của nhà trường trong vòng 01 ngày sau khi hợp đồng được ký kết.
                        </p>
                        <h3 className={cx('h3')}>
                            Điều 3: Hợp đồng hết hiệu lực và bên A không có trách nhiệm hoàn trả tiền cho bên B khi:
                        </h3>
                        <p className={cx('p')}>
                            - Thời hạn ghi trong hợp đồng kết thúc.
                            <br />
                            - Bên B đề nghị chấm dứt hợp đồng trước thời hạn.
                            <br />
                            - Bên B hiện không còn là sinh viên của trường: đã tốt nghiệp, bị đình chỉ học tập, bị đuổi
                            học hoặc tự ý bỏ học.
                            <br />
                            - Bên B không đảm bảo về sức khỏe, mắc các chứng bệnh về lây nhiễm theo kết luận của cơ quan
                            y tế cấp quận (huyện) trở lên.
                            <br />- Bên B vi phạm Nội quy Ký túc xá, bị xử lý kỷ luật theo Khung kỷ luật ban hành mức
                            chấm dứt hợp đồng, cho ra khỏi Ký túc xá.
                        </p>
                        <h3 className={cx('h3')}>Điều 4: Trách nhiệm của bên B.</h3>
                        <p className={cx('p')}>
                            - Ở đúng nơi đã được Ban quản trị Ký túc xá sắp xếp (vị trí phòng ở và giường ở).
                            <br />
                            - Chấp hành sự điều chuyển chỗ ở của Ban quản trị Ký túc xá trong trường hợp cần thiết và có
                            lý do chính đáng: (Ký túc xá sửa chữa nâng cấp, lý do về an ninh trật tự và một số lý do
                            khác).
                            <br />- Không được cho thuê lại chỗ ở cũng như tự ý chuyển nhượng lại hợp đồng cho người
                            khác.
                        </p>
                        <h3 className={cx('h3')}>Điều 5: Trách nhiệm của Bên A.</h3>
                        <p className={cx('p')}>
                            - Không được đun nấu trong phòng ở và xung quanh khu nội trú.
                            <br />
                            - Chấp hành nghiêm chỉnh các quy định của Nhà nước, của Trường, Nội quy Ký túc xá.
                            <br />
                            - Tự bảo quản tài sản và đồ dùng cá nhân, tự chịu trách nhiệm về việc bảo quản an toàn cho
                            mình đối với việc sử dụng các dụng cụ, thiết bị cũng như các hoạt động khác.
                            <br />
                            - Có ý thức tự giác trong việc bảo quản tài sản công, triệt để tiết kiệm, chống lãng phí,
                            thực hiện nghĩa vụ đầy đủ về trật tự vệ sinh Ký túc xá. Cam kết giữ nghiêm, có tinh thần
                            trách nhiệm và ý thức tập thể.
                            <br />
                            - Bồi thường các mất mát hư hỏng tài sản công do mình gây ra theo quy định chung của nhà
                            trường.
                            <br />
                            - Tự thanh toán các chi phí dịch vụ cá nhân khác như dịch vụ ăn uống, gửi xe…
                            <br />
                            - Thanh toán đầy đủ các khoản phí đúng hạn, lưu giữ phiếu thu để đối chiếu khi cần thiết.
                            <br />
                            - Cam kết giữ nghiêm kỷ luật nội trú, có tinh thần trách nhiệm và ý thức tập thể.
                            <br />
                            - Phải trả phòng và ra khỏi ký túc xá vào ngày hợp đồng hết hiệu lực
                            <br />
                            - Sắp xếp chỗ ở cho Bên B ngay sau khi Bên B đã hoàn thành các thủ tục đăng ký chỗ ở theo
                            quy định và thời gian trong hợp đồng.
                            <br />
                            - Đảm bảo các điều kiện về việc sinh hoạt và học tập cho Bên B theo quy định chung.
                            <br />
                            - Hướng dẫn Bên B sử dụng các trang thiết bị trong phòng ở.
                            <br />- Lưu hóa đơn (phiếu thu) các khoản tiền do Bên B đóng.
                        </p>
                        <h3 className={cx('h3')}>Điều 6: Điều khoản chung.</h3>
                        <p className={cx('p')}>
                            - Bên nào muốn chấm dứt hợp đồng trước thời hạn phải có văn bản báo cho bên thứ hai biết
                            trước ít nhất là 15 ngày (trừ trường hợp SV bị xử lý kỷ luật vì các lý do khác, hay bị kỷ
                            luật vì vi phạm quy định KTX).
                            <br />
                            - Quy chế tổ chức & hoạt động Ký túc xá, Nội quy Ký túc xá, Phiếu đăng ký ở nội trú, Bản cam
                            kết đã ký là bộ phận chung của hợp đồng này.
                            <br />
                            - Hai bên cam kết thực hiện theo đúng các điều khoản của hợp đồng và Bản cam kết.
                            <br />
                            - Hợp đồng được lập thành 02 bản có giá trị ngang nhau, Bên A giữ 01 bản và Bên B giữ 01
                            bản.
                            <br />- Bên B phải bàn giao trang thiết bị phòng ở cho bên A khi nghỉ hè (Tết), thực tập và
                            trước khi kết thúc hợp đồng.
                        </p>
                        <div className={cx('div')}>
                            <div className={cx('p')}>
                                <div>Bên A</div>
                                <div>{dataContract.user_id.fullName}</div>
                            </div>
                            <div className={cx('p')}>
                                <div>Bên B</div>
                                <div>{dataContract.student_id.fullName}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={cx('title')}>Chưa làm hợp đồng . Vui lòng liên hệ với người quản lý!</div>
                )}
            </div>
        </div>
    );
}

export default Contract;
