import { Link } from "react-router-dom";
import NavIcon from "../../../NavIcon";
import { FaAccessibleIcon } from "react-icons/fa6";

function Navbar() {
  return (
    <>
      <nav className="navbar bg-primary navbar-expand-md">
        <div className="container-fluid px-4">
          <Link className="navbar-brand"to="./"><FaAccessibleIcon /></Link> 

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link"to="/tiepdon" aria-current="page">Tiếp đón</Link> 
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Khám bệnh
            </Link> 
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item"to="/khambenh/dosinhhieu">Đo sinh hiệu</Link> </li>
              <li><Link className="dropdown-item"to="/khambenh">Khám bệnh</Link> </li>
              <li><Link className="dropdown-item"to="/khambenh/canlamsang">Cận lâm sàng</Link> </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link"to="/khachhang" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Khách hàng
            </Link> 
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item"to="#">Action</Link> </li>
              <li><Link className="dropdown-item"to="#">Another action</Link> </li>
              <li><Link className="dropdown-item"to="#">Something else here</Link> </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link"to="/thuoc" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Thuốc
            </Link> 
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item"to="#">Action</Link> </li>
              <li><Link className="dropdown-item"to="#">Another action</Link> </li>
              <li><Link className="dropdown-item"to="#">Something else here</Link> </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link"to="/dashboard" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dashboard
            </Link> 
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item"to="#">Action</Link> </li>
              <li><Link className="dropdown-item"to="#">Another action</Link> </li>
              <li><Link className="dropdown-item"to="#">Something else here</Link> </li>
            </ul>
          </li>
          </ul>
          <NavIcon />
        </div>
      </nav>

    </>
  );
}

export default Navbar;