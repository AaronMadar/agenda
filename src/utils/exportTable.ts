import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import rubikFont from "@/utils/rubikFont";

const generateFileName = (extension: string) => {
  const date = new Date();
  const timestamp = date.toISOString().replace(/[:.-]/g, "");
  return `table_${timestamp}.${extension}`;
}

export const exportToExcel = (data: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Table");

  const buffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, generateFileName("xlsx"));
};

export const exportToCSV = (data: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });

  saveAs(blob, generateFileName("csv"));
};

export const exportToPDF = (data: any[]) => {
  const doc = new jsPDF();

  doc.addFileToVFS("Rubik.ttf", rubikFont);
  doc.addFont("Rubik.ttf", "Rubik", "normal", "Identity-H");
  doc.setFont("Rubik");

  const fixRTL = (text: any) =>
    typeof text === "string"
      ? text.split("").reverse().join("")
      : text;

  const splitRTLText = (text: string | string[], width: number) => {
    const lines = Array.isArray(text) ? text : [text];

    return lines.flatMap((line) =>
      doc
        .splitTextToSize(fixRTL(line), width)
        .map((splitLine: string) => fixRTL(splitLine))
    );
  };

  const rawColumns = Object.keys(data[0] || {}).reverse();
  const columns = rawColumns.map(fixRTL);

  const rows = data.map((row) =>
    rawColumns.map((col) => fixRTL(row[col]))
  );

  autoTable(doc, {
    head: [columns],
    body: rows,
    styles: {
      font: "Rubik",
      overflow: splitRTLText,
      halign: "right",
    },
    headStyles: {
      font: "Rubik",
      fontStyle: "normal",
      halign: "right",
    },
  });

  doc.save(generateFileName("pdf"));
};

export const formatDataForExport = <T>(
  data: T[],
  columns: { accessor: string; label: string }[]
) => {
  return data.map((row: any) => {
    const newRow: Record<string, any> = {};

    columns.forEach((col) => {
      newRow[col.label] = row[col.accessor] ?? "";
    });

    return newRow;
  });
};
