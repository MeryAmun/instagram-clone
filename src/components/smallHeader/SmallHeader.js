import React from "react";
import { Heart, Search, X } from "react-feather";
import { Button } from "@mui/material";
import { Header } from "../index";
import "./smallHeader.css";

const SmallHeader = () => {
  return (
    <div className="smallHeader">
      <div className="smallHeader__head">
        <Header />
      </div>
      <div className="smallHeader__searchField">
        <input
          type="search"
          placeholder="Search"
          className="smallHeader__search"
        />
        {/* <div className="smallHeader__searchIcon">
          <Search />
        </div>
        <div className="smallHeader__closeIcon">
          <X />
        </div> */}
      </div>
      <span className="smallHeader__icon">
        <Heart size={20}/>
      </span>
      <Button onClick={() => {}}>Login</Button>
    </div>
  );
};

export default SmallHeader;
