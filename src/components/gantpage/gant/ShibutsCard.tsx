import React, { useState, useRef } from "react";
import dayjs from "dayjs";
import { Popover, Tooltip } from "@mui/material";

import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";
import { ResourcePopUp } from "@/components/shared/pop-ups/ResourcePopUp";
import { DetailsPopUp } from "@/components/shared/pop-ups/DetailsPopUp";
import { KeyValPopUp } from "@/components/shared/pop-ups/KeyValPopUp";

import { Details } from "@/assets/icons";
import { iconResources, iconServiceType } from "@/constants/icons";
import type { ShibutsApi, ResourceItem } from "@/types/api-response";
import styles from "@/style/components/gantpage/ShibutsCard.module.css";

dayjs.locale("he");

interface ShibutsCardProps {
  shibuts: ShibutsApi;
  pickud: string;
  style?: React.CSSProperties;
  className?: string;
}

export function ShibutsCard({
  shibuts,
  style,
  className,
  pickud,
}: ShibutsCardProps) {
  
  const [detailsAnchorEl, setDetailsAnchorEl] = useState<HTMLElement | null>(null);
  const [resourceAnchorEl, setResourceAnchorEl] = useState<HTMLElement | null>(null);
  const [titleAnchorEl, setTitleAnchorEl] = useState<HTMLElement | null>(null);
  const [hoveredResource, setHoveredResource] = useState<ResourceItem | null>(null);
  const [isCardActive, setIsCardActive] = useState(false);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    title,
    variationPastYear,
    dateBegin,
    dateEnd,
    resources,
    seviceType,
    codeShibuts,
    mesima,
    directCost,
    costOfItems,
  } = shibuts;

  const icon =
    iconServiceType[seviceType as keyof typeof iconServiceType] ??
    iconServiceType.default;

  const formattedBegin = dateBegin ? dayjs(dateBegin).format("D MMM") : "";
  const formattedEnd = dateEnd ? dayjs(dateEnd).format("D MMM") : "";
  const amountOfDays = dateBegin && dateEnd ? dayjs(dateEnd).diff(dayjs(dateBegin), "day") + 1 : null;

  const metadataShibuts = [
    { key: "קוד שיבוץ", value: codeShibuts },
    { key: "יחידה", value: pickud },
    { key: "משימה", value: mesima },
    { key: "עלות ישיר", value: String(directCost) },
    { key: "עלות פריטי", value: String(costOfItems) },
    { key: "משך", value: `${amountOfDays} ימים` },
  ];

  /* -------------------- Hover Logic -------------------- */

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const delayedClose = (
    setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  ) => {
    closeTimerRef.current = setTimeout(() => {
      setter(null);
    }, 10);
  };

  const handleCardLeave = () => {
    setIsCardActive(false);
    setDetailsAnchorEl(null);
    setResourceAnchorEl(null);
    setTitleAnchorEl(null);
  };

  /* -------------------- Render -------------------- */

  return (
    <div
      className={`${styles.shibutsCard} ${
        isCardActive ? styles.activeCard : ""
      } ${className || ""}`}
      style={style}
      onMouseEnter={() => setIsCardActive(true)}
      onMouseLeave={handleCardLeave}
    >
      {/* ---------- Top Section ---------- */}
      <div className={styles.divUp}>
        <div className={styles.iconAndTitle}>
          <Tooltip title={seviceType} arrow placement="top" >
            <i className={`icon-card ${icon.className}`} />
          </Tooltip>
          <span
            className={styles.cardTitle}
            onMouseEnter={(e) => {
              clearCloseTimer();
              setTitleAnchorEl(e.currentTarget);
            }}
            onMouseLeave={() => delayedClose(setTitleAnchorEl)}
          >
            {title}
          </span>
        </div>

        <div
          className={`${styles.variationContainer} ${
            isCardActive ? styles.visible : ""
          }`}
        >
          <div className={styles.detailsAndPercentage}>
            <div
              className={styles.detailsButton}
              onClick={(e) => {
                clearCloseTimer();
                setDetailsAnchorEl(e.currentTarget);
              }}
              onMouseLeave={() => delayedClose(setDetailsAnchorEl)}
            >
              <Details className={styles.detailsIcon} />
            </div>

            <PercentageWithArrow value={variationPastYear} gantMode />
          </div>
        </div>
      </div>

      {/* ---------- Bottom Section ---------- */}
      <div className={styles.divDown} style={{ opacity: isCardActive ? 1 : 0 }}>
        <div className={styles.flexRow}>
          {formattedBegin && formattedEnd && (
            <Tooltip title={`${amountOfDays} ימים`} arrow placement="bottom">
              <span className={styles.spanDate}>
                {formattedBegin} - {formattedEnd}
              </span>
            </Tooltip>
          )}

          {resources?.map((res, index) => (
            <div
              key={index}
              className={styles.divRessource}
              onMouseEnter={(e) => {
                clearCloseTimer();
                setHoveredResource(res);
                setResourceAnchorEl(e.currentTarget);
                setTitleAnchorEl(null)
              }}
              onMouseLeave={() => delayedClose(setResourceAnchorEl)}
              style={{
                borderRight: index === 0 ? "none" : "1px solid #ccc",
              }}
            >
              <i
                className={
                  iconResources[
                    res.categoryName as keyof typeof iconResources
                  ] ?? iconResources.default
                }
              />
              <span>{res.categoryName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Details Popover ---------- */}
      <Popover
        open={Boolean(detailsAnchorEl)}
        anchorEl={detailsAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
        slotProps={{
          paper: {
            onMouseEnter: clearCloseTimer,
            onMouseLeave: () => delayedClose(setDetailsAnchorEl),
            sx: {
              pointerEvents: "auto",
              backgroundColor: "transparent",
              borderRadius: "10px",
              overflow: "visible"
            },
          },
        }}
      >
        <DetailsPopUp />
      </Popover>

      {/* ---------- Title Popover ---------- */}
      <Popover
        open={Boolean(titleAnchorEl)}
        anchorEl={titleAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
        slotProps={{
          paper: {
            onMouseEnter: clearCloseTimer,
            onMouseLeave: () => delayedClose(setTitleAnchorEl),
            sx: {
              pointerEvents: "auto",
              backgroundColor: "transparent",
              borderRadius: "10px",
              overflow: "visible"
            },
          },
        }}
      >
        <KeyValPopUp header={title} keyValues={metadataShibuts} />
      </Popover>

      {/* ---------- Resource Popover ---------- */}
      <Popover
        open={Boolean(resourceAnchorEl)}
        anchorEl={resourceAnchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
        slotProps={{
          paper: {
            onMouseEnter: clearCloseTimer,
            onMouseLeave: () => delayedClose(setResourceAnchorEl),
            sx: {
              pointerEvents: "auto",
              backgroundColor: "transparent",
              borderRadius: "10px",
              overflow: "visible"
            },
          },
        }}
      >
        <ResourcePopUp resourceDetailsTable={hoveredResource?.items || []} />
      </Popover>
    </div>
  );
}



