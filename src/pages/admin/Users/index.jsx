import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LayoutAdminPage from "../../../HOCs/LayoutAdminPage";
import {
  setUserAction,
  setUserDetailAction,
} from "../../../store/action/users";

const Users = (props) => {
  // const me = useSelector((state) => state.auth.auth);
  const userList = useSelector((state) => state.users.userList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserAction());
  }, [dispatch]);

  const handleUpdateUser = (item) => {
    setUserDetailAction(dispatch, item);
  };

  const renderTableBody = () => {
    const tableBodyHTML = userList.map((item) => {
      return (
        <tr className="py-auto" style={{ fontSize: "16px" }}>
          <td style={{ width: "5%" }}>{userList.indexOf(item) + 1}</td>
          <td style={{ width: "20%" }}>
            <p className="fw-bold">{item.fullName}</p>
          </td>
          <td style={{ width: "10%" }}>{item.userName}</td>

          <td style={{ width: "10%" }}>{item.phoneNumber}</td>
          <td style={{ width: "10%" }}>{item.email}</td>
          <td style={{ width: "30%" }}>{item.address}</td>
          <td style={{ width: "5%" }}>{item.userType}</td>
          <td style={{ width: "10%" }}>
            <div className="d-flex justify-content-center">
              <NavLink to={`/admin/users/${item._id}`}>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleUpdateUser(item)}
                >
                  <i class="fa fa-edit"></i>
                </button>
              </NavLink>
            </div>
          </td>
        </tr>
      );
    });

    return tableBodyHTML;
  };

  return (
    <LayoutAdminPage>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-3 py-3">
            <span className="fs-2 fw-bolder">Users</span>
          </div>
          <div className="col-9 row py-3 ">
            <div className="col-12 col-md-6 d-flex justify-content-end">
              {/* <input
                id="keyword"
                className="w-100 text-white bg-dark border border-warning border-2 px-2"
                placeholder="Enter Keyword"
                value={values.keyword}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>

              <button
                className="btn btn-dark border border-warning border-2 ms-2"
                onClick={() => searchUsers()}
              >
                <i class="fa fa-search"></i>
              </button> */}
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-end">
              <NavLink to="/admin/insertuser">
                <button className="btn btn-dark border border-warning border-2 p-2">
                  INSERT USER <i class="fa fa-plus text-warning fs-4 ps-2"></i>
                </button>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="table-responsive col-12 container-fluid">
          <table className="w-100 table table-hover table-bordered ">
            <thead className="table-light text-warning">
              <tr>
                <th>NO.</th>
                <th>FULLNAME</th>
                <th>USERNAME</th>
                <th>PHONE</th>
                <th>EMAIL</th>
                <th>ADDRESS</th>
                <th>TYPE</th>
                <th className="text-center">DETAIL</th>
              </tr>
            </thead>
            <tbody>{renderTableBody()}</tbody>
          </table>
        </div>
      </div>
    </LayoutAdminPage>
  );
};

export default Users;
