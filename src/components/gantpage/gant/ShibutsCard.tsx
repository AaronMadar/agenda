import { Popover } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";

import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";
import type { ResourceItem } from "@/types/api-response";
import { iconResources } from "@/constants/icons";
import { ResourcePopUp } from "@/components/shared/pop-ups/ResourcePopUp";

import "@/style/components/gantpage/ShibutsCard.css";



const resourceDetailsTable = [
            { "item": "כד’ 5.56 מ”מ לאימונים", "quantity": 1200, "price": 1.5 },
            { "item": "כד’ 5.56 מ”מ", "quantity": 300, "price": 5 },
            { "item": "רימון יד מס’ 4", "quantity": 500, "price": 2 },
            { "item": "רימון יד מס’ 20", "quantity": 200, "price": 3 }
          ]




interface ShibutsCardProps {
  title: string;
  variation?: string;
  dateBegin?: string;
  dateEnd?: string;
  resources?: ResourceItem[];
  style?: React.CSSProperties;
  className?: string;
  icon?: string;
}

export function ShibutsCard({
  title,
  variation,
  dateBegin,
  dateEnd,
  resources,
  style,
  className,
  icon,
}: ShibutsCardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [hoveredResource, setHoveredResource] = useState<ResourceItem | null>(null);

  const open = Boolean(anchorEl);

  const [isHovered, setIsHovered] = useState(false);

  dayjs.locale("he");
  const formattedBegin = dateBegin
    ? `${dayjs(dateBegin).format("D MMM")}\``
    : "";
  const formattedEnd = dateEnd ? `${dayjs(dateEnd).format("D MMM")}\`` : "";

  return (
    <div
      className={`shibuts-card ${className || ""}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="div-up">
        <div className="iconAndTitle">
          <i className={`icon-card ${icon}`}></i>
          <span className="card-title">{title}</span>
        </div>

        <div
          className={`variation-container ${isHovered ? "visible" : "hidden"}`}
        >
          <PercentageWithArrow
            value={variation ? parseFloat(variation) : 0}
            gantMode
          />
        </div>
      </div>
      <div className="div-down">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          {formattedBegin && formattedEnd && (
            <span className="spanDate">
              {formattedBegin} - {formattedEnd}
            </span>
          )}

          {resources &&
            resources.map((res, index) => (
              <div
                key={index}
                className="div-ressource"
                onMouseEnter={(e) => {
                  setAnchorEl(e.currentTarget);
                  setHoveredResource(res);
                }}
                onMouseLeave={() => {
                  setAnchorEl(null);
                  setHoveredResource(null);
                }}
                style={{
                  borderRight: index === 0 ? "none" : "1px solid #ccc",
                }}
              >
                <i
                  className={
                    iconResources[res.item as keyof typeof iconResources] ??
                    iconResources.default
                  }
                />
                <span>{res.item}</span>
              </div>
            ))}

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{ pointerEvents: "none" }}
            disableRestoreFocus
            slotProps={{
                paper: {
                sx: {
                    // all: "unset",
                    background: "unset",
                    color: "unset",
                    border: "unset",
                    font: "unset"
                    // pointerEvents: "none",
                },
                },
            }}
          >
            <ResourcePopUp resourceDetailsTable={resourceDetailsTable} />
          </Popover>
        </div>
      </div>
    </div>
  );
}