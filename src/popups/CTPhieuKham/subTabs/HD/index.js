import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";
import { selectHD } from "../../../../redux/slice/getDataSlice/getHoaDonSlice";

function HoaDon() {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.fetchHoaDon?.dshd);
  const ctdt = useSelector((state) => state.existedCTDT?.data);
  const dsCLS = useSelector((state) => state.fetchCLS?.dsClsById);
  const dspkByIdHd = useSelector((state) => state.fetchDSDK?.pkByIdHd);

  const handleOnDelete = (page) => {
    console.log(page);
  };
  const handleRowClick = (row) => {
    dispatch(selectHD(row));
  };

  const columns = [
    { title: "Mã hóa đơn", key: "MAHD" },
    { title: "Loại", key: "TENLOAIHD" },
    { title: "Tổng tiền", key: "THANHTIEN" },
    { title: "Trạng thái", key: "TTTT" },
    { title: "Thời gian thanh toán", key: "TDTT" },
  ];

  const columnsCTDT = [
    { title: "STT", key: "" }, //STT
    { title: "Tên thuốc", key: "TENTHUOC" },
    { title: "Liều dùng", key: "GHICHU" },
    { title: "Đơn vị thuốc", key: "TENDONVI" },
    { title: "Số lượng thuốc", key: "SOLUONGTHUOC" },
    { title: "Đơn giá", key: "GIABAN" }, //Giá 1 đơn vị thuốc
    { title: "Thành tiền", key: "thanhTien" }, //Giá 1 đơn vị x số lượng thuốc
  ];

  const columnsDSPK = [
    { title: "Mã phiếu khám", key: "MAPK" },
    { title: "Dịch vụ", key: "TENDV" },
    { title: "Giá", key: "GIADV" },
    { title: "Ngày khám", key: "NGAYKHAMMIN" },
    { title: "Trạng thái", key: "TRANGTHAITH" },
  ];

  const columnsDSCLS = [
    { title: "Mã phiếu CLS", key: "MAKQ" },
    { title: "Dịch vụ", key: "TENDV" },
    { title: "Giá", key: "GIADV" },
    { title: "Thời gian thực hiện", key: "NGAYKHAMMIN" },
    { title: "Trạng thái", key: "TRANGTHAITH" },
  ];

  return (
    <div className="shadow rounded">
      {/* Thông tin */}
      <div className="px-3 py-2 d-flex justify-content-center bg-primary rounded-top">
        Dịch vụ - Đơn thuốc
      </div>
      <div class="container rounded py-2">
        <div class="table-responsive">
          <table class="table accordion">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} scope="col">
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bills.map((row, rowIndex) =>
                rowIndex === 0 ? (
                  <tr
                    data-bs-toggle="collapse"
                    data-bs-target="#r0"
                    key={rowIndex}
                    onClick={() => handleRowClick(row)}
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>{row[column.key] || ""}</td>
                    ))}
                  </tr>
                ) : null
              )}
              <tr
                class="collapse accordion-collapse"
                id="r0"
                data-bs-parent=".table"
              >
                <td colspan="5">
                  <div className="py-3 border border-primary">
                    <ListForm
                      columns={columnsDSPK}
                      data={dspkByIdHd}
                      onDeleteService={handleOnDelete}
                    ></ListForm>
                  </div>
                </td>
              </tr>
              {bills.map((row, rowIndex) =>
                rowIndex === 1 ? (
                  <tr
                    data-bs-toggle="collapse"
                    data-bs-target="#r1"
                    key={rowIndex}
                    onClick={() => handleRowClick(row)}
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>{row[column.key] || ""}</td>
                    ))}
                  </tr>
                ) : null
              )}
              {dsCLS?.length === 0 && ctdt?.length === 0 ? null : (
                <tr
                  class="collapse accordion-collapse"
                  id="r1"
                  data-bs-parent=".table"
                >
                  <td colspan="5">
                    <div className="py-3 border border-primary">
                      <ListForm
                        columns={
                          dsCLS?.length === 0 ? columnsCTDT : columnsDSCLS
                        }
                        data={dsCLS?.length === 0 ? ctdt : dsCLS}
                        onDeleteService={handleOnDelete}
                      ></ListForm>
                    </div>
                  </td>
                </tr>
              )}

              {bills.map((row, rowIndex) =>
                rowIndex === 2 ? (
                  <tr
                    data-bs-toggle="collapse"
                    data-bs-target="#r2"
                    key={rowIndex}
                    onClick={() => handleRowClick(row)}
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>{row[column.key] || ""}</td>
                    ))}
                  </tr>
                ) : null
              )}
              {dsCLS?.length === 0 ||
              (dsCLS?.length !== 0 && ctdt?.length === 0) ? null : (
                <tr
                  class="collapse accordion-collapse"
                  id="r2"
                  data-bs-parent=".table"
                >
                  <td colspan="5">
                    <div className="py-3 border border-primary">
                      <ListForm
                        columns={columnsCTDT}
                        data={ctdt}
                        onDeleteService={handleOnDelete}
                      ></ListForm>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HoaDon;
