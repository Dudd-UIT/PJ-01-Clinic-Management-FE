import React, { useEffect, useState } from "react";
import {
  IFInputText,
  IFSelect,
  IFNgay,
  IFSearchDV,
  IFSearchHT,
  IFSearch,
} from "../../../../component/Layout/TabLayout/InputForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { postAllDataDKKAction } from "../../../../redux/action/postDataAction/postAllDataDKKAction";
import { fetchAllBacSiAction } from "../../../../redux/action/fetchDataAction/fetchAllBacSiAction";
import { fetchAllDichVuAction } from "../../../../redux/action/fetchDataAction/fetchAllDichVuAction";
import { fetchAllBenhNhanAction } from "../../../../redux/action/fetchDataAction/fetchAllBenhNhanAction";

import { ListForm } from "../../../../component/Layout/TabLayout/ListForm";
import Alert from "../../../../component/Alert";
import { type } from "@testing-library/user-event/dist/type";

function DangKyKham() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.fetchAllBacSi.doctors);
  const services = useSelector((state) => state.fetchAllDichVu.services);
  const patients = useSelector((state) => state.fetchAllBenhNhan.patients);
  console.log("patients", patients);
  console.log("services", services);

  const [showError, setShowError] = useState(false);
  const [oldPatientID, setOldPatientID] = useState(0);
  console.log(oldPatientID);

  const [age, setAge] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const [formData, setFormData] = useState({
    hoTen: "",
    gioiTinh: "",
    diaChi: "",
    ngaySinh: "",
    cccd: "",
    soDienThoai: "",
    diUng: "",
    ngayKham: new Date(),
    maBS: "",
    lyDoKham: "",
    tienSuBenh: "",
    dichVu: [],
  });
  console.log(formData);
  const columns = [
    { title: "Mã dịch vụ", key: "MADV" },
    { title: "Mã loại dịch vụ", key: "MALDV" },
    { title: "Tên dịch vụ", key: "TENDV" },
    { title: "Giá dịch vụ", key: "GIADV" },
  ];

  useEffect(() => {
    dispatch(fetchAllBacSiAction());
    dispatch(fetchAllDichVuAction());
    dispatch(fetchAllBenhNhanAction());
  }, []);

  // const handleChange = (fieldName, value) => {
  //   setFormData({ ...formData, [fieldName]: value });

  //   if (fieldName === "ngaySinh") {
  //     const age = calculateAge(value);
  //     setAge(age);
  //   }
  // };

  const checkPatientExistence = (fullName) => {
    const patient = patients.find((patient) => patient.HOTEN === fullName);
    return patient ? patient : null;
  };

  const handleChange = (fieldName, value) => {
    if (fieldName === "hoTen") {
      const patient = checkPatientExistence(value);
      console.log("patient", patient);
      if (patient) {
        setFormData({
          ...formData,
          hoTen: patient.HOTEN,
          gioiTinh: patient.GIOITINH,
          diaChi: patient.DIACHI,
          ngaySinh: new Date(patient.NGAYSINH),
          cccd: patient.CCCD,
          soDienThoai: patient.SDT,
          diUng: patient.DIUNG,
          tienSuBenh: patient.TIENSUBENH,
        });
        setOldPatientID(patient.MABN);
        //console.log("patient[4]", patient[4]);
        console.log("formData.ngaySinh", formData.ngaySinh);

        const age = calculateAge(patient.NGAYSINH);
        setAge(age);
      } else {
        setFormData({ ...formData, [fieldName]: value });
      }
    } else {
      setFormData({ ...formData, [fieldName]: value });

      if (fieldName === "ngaySinh") {
        const age = calculateAge(value);
        setAge(age);
      }
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age > 0 ? age : 0;
  };

  const handleFormSubmit = async () => {
    if (selectedServices.length > 0) {
      if (formData.cccd !== "" && formData.hoTen !== "") {
        let apiPath = "",
          bodyReq = {};
        formData.dichVu.forEach(async (maDV) => {
          if (oldPatientID !== 0) {
            apiPath = "http://localhost:3001/phieukham/insert-pk";
            bodyReq = {
              maBN: oldPatientID,
              maBS: formData.maBS,
              ngayKham: formData.ngayKham,
              lyDoKham: formData.lyDoKham,
            };
          } else {
            apiPath = "http://localhost:3001/phieukham/insert-bn-pk";
            bodyReq = formData;
          }
          bodyReq.dichVu = maDV;
          try {
            const response = await axios.post(apiPath, bodyReq);

            if (response.status === 200) {
              if (response.data.maBNOld) {
                setOldPatientID(response.data.maBNOld);
              }
              alert("Thêm thành công!!!");
              console.log("Thêm thành công!!!");
            } else {
              console.log("Thêm không thành công, vui lòng thử lại.");
              alert("Thêm không thành công, vui lòng thử lại.");
            }
          } catch (error) {
            console.log("Failed to submit data", error);
            alert("Failed to submit data", error);
          }
        });
      }
    } else {
      alert("Chưa thêm dịch vụ nào.");
    }
  };

  // const handleOK = () => {
  //   setShowAlert(false);
  //   window.location.reload();
  // };

  const handleAddService = (selected) => {
    if (selected) {
      const updatedServices = [...selectedServices, selected];
      const selectedNoServices = updatedServices.map(
        (selectedService) => selectedService.MADV
      );
      console.log(selectedNoServices);
      setSelectedServices(updatedServices);
      setFormData({ ...formData, dichVu: selectedNoServices });
    }
  };

  const handleDeleteService = (index) => {
    const updatedServices = [...selectedServices];
    updatedServices.splice(index, 1);
    setSelectedServices(updatedServices);
    const selectedNoServices = updatedServices.map(
      (selectedService) => selectedService.MADV
    );
    setFormData({ ...formData, dichVu: selectedNoServices });
  };

  return (
    <div>
      <form class="needs-validation" novalidate>
        {/* Thông tin */}
        <div className="px-3 py-2 bg-primary">Thông tin</div>
        <div className="py-3 border border-primary">
          <div className="container-fluid mb-">
            <div className="row py-2">
              <IFSearchHT
                title={"Họ và Tên"}
                size={4}
                options={patients}
                required={true}
                onChange={(value) => handleChange("hoTen", value)}
              />
              <IFSelect
                title={"Giới tính"}
                size={2}
                options={[
                  { gioiTinh: "Nam" },
                  { gioiTinh: "Nữ" },
                  { gioiTinh: "Khác" },
                ]}
                onChange={(value) => handleChange("gioiTinh", value)}
                selected={formData.gioiTinh}
                keyObj={"gioiTinh"}
              />
              <IFInputText
                title={"Địa chỉ"}
                size={6}
                onChange={(value) => handleChange("diaChi", value)}
                value={formData.diaChi}
              />
            </div>
            <div className="row py-2">
              <IFNgay
                title={"Ngày sinh"}
                size={2}
                onChange={(value) => handleChange("ngaySinh", value)}
                value={formData.ngaySinh}
              />
              <IFInputText
                title={"Tuổi"}
                size={1}
                value={age}
                readOnly={true}
                onChange={(value) => handleChange("tuoi", value)}
              />
              <IFInputText
                title={"CCCD"}
                size={3}
                onChange={(value) => handleChange("cccd", value)}
                required={true}
                value={formData.cccd}
              />
              <IFInputText
                title={"Số điện thoại"}
                size={3}
                onChange={(value) => handleChange("soDienThoai", value)}
                value={formData.soDienThoai}
              />
              <IFInputText
                title={"Dị ứng"}
                size={3}
                onChange={(value) => handleChange("diUng", value)}
                value={formData.diUng}
              />
            </div>
            <div className="row py-2">
              <IFNgay
                title={"Ngày khám"}
                size={2}
                onChange={(value) => handleChange("ngayKham", value)}
                defaultValue={new Date()}
              />
              <IFSelect
                title={"Bác sĩ"}
                size={3}
                options={doctors}
                onChange={(value) => {
                  const selected = doctors.find(
                    (doctor) => doctor.HOTEN === value
                  );
                  console.log(selected);
                  if (selected) {
                    handleChange("maBS", selected.MABS);
                  }
                }}
                keyObj={"HOTEN"}
              />
              <IFInputText
                title={"Lý do khám"}
                size={4}
                onChange={(value) => handleChange("lyDoKham", value)}
              />
              <IFInputText
                title={"Tiền sử bệnh"}
                size={3}
                value={formData.tienSuBenh}
                onChange={(value) => handleChange("tienSuBenh", value)}
              />
            </div>
          </div>
        </div>

        {/* Dịch vụ */}
        <div className="px-3 py-2 bg-primary">Dịch vụ</div>
        <div className="py-3 border border-primary">
          <div className="container-fluid mb-3">
            <div className="row py-2">
              <IFSearchDV
                title={"Nhập dịch vụ"}
                size={6}
                options={services}
                onChange={(value) => {
                  const selected = services.find(
                    (service) => service.TENDV === value
                  );
                  if (selected) {
                    const alreadySelected = selectedServices.find(
                      (item) => item.MADV === selected.MADV
                    );

                    if (alreadySelected) {
                      setShowError(true);
                    } else {
                      setShowError(false);
                      handleAddService(selected);
                    }
                  }
                }}
              />
              {showError && selectedServices.length > 0 && (
                <div className="text-danger">Dịch vụ này đã được chọn.</div>
              )}
            </div>
            {selectedServices.length > 0 ? (
              <ListForm
                columns={columns}
                data={selectedServices}
                onDeleteService={handleDeleteService}
              />
            ) : (
              <div className="d-flex justify-content-center text-danger">
                Chưa thêm dịch vụ nào.
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center px-3 py-2">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleFormSubmit}
          >
            Đăng kí
          </button>
        </div>
      </form>
      {/* {showAlert && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )} */}
    </div>
  );
}

export default DangKyKham;
