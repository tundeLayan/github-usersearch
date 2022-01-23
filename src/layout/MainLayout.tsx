import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../redux";

const MainLayout = ({ children }: any) => {
  const {
    users: { query },
  } = useSelector((state: RootStateType) => state);
  const [value, setValue] = useState(query);
  useEffect(() => {
    setValue(query);
  }, [query]);
  return (
    <div>
      <div style={{ paddingTop: "40px" }}>
        {/* <nav className="header">
          <ul className="nav-lists">
            <li>Logo</li>
            {!!query ? (
              <li>
                <input
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
              </li>
            ) : null}
            <li>Pull requests</li>
            <li>Issues</li>
            <li>Marketplace</li>
            <li>Explore</li>
          </ul>
          <ul className="list-actions">
            <li>Bell</li>
            <li>Plus</li>
            <li>Profile</li>
          </ul>
        </nav> */}
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
