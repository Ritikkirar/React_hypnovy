import React from 'react'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { MdDownload } from 'react-icons/md'


const ExcelExport = ({ excelData, fileName, NumberOfColumn }) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData)

        // Apply styling to cells
        const cellStyle = {
            alignment: {
                wrapText: true, // Apply text wrapping
                horizontal: 'center', // Set horizontal alignment to center (other options: 'left', 'right', 'justify')
                vertical: 'center', // Set vertical alignment to middle (other options: 'top', 'bottom')
            },
            font: { bold: true }, // Apply bold font
        };

        // Apply cell style to header row
        const headerRange = XLSX.utils.decode_range(ws['!ref']);
        for (let c = headerRange.s.c; c <= headerRange.e.c; ++c) {
            const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c });
            ws[cellAddress].s = cellStyle;
        }

        // Apply styling to individual data cells
        const dataRange = XLSX.utils.decode_range(ws['!ref']);
        for (let r = dataRange.s.r + 1; r <= dataRange.e.r; ++r) {
            for (let c = dataRange.s.c; c <= dataRange.e.c; ++c) {
                const cellAddress = XLSX.utils.encode_cell({ r, c });
                ws[cellAddress].s = {
                    alignment: {
                        wrapText: true,   // Apply text wrapping to individual data cells
                        horizontal: 'center',
                        vertical: 'center'
                    }
                };
            }
        }

        // Set column widths (adjust as needed)
        const columnWidth = 23; // Adjust the width value as needed
        const columnCount = NumberOfColumn;  // Adjust the column count as needed
        const columnWidths = Array(columnCount).fill({ wch: columnWidth });
        ws['!cols'] = columnWidths;

        // Set row height (adjust 20 as needed)
        const rowHeight = 50;
        ws['!rows'] = Array(dataRange.e.r - dataRange.s.r + 1).fill({ hpt: rowHeight * 1.25, hpx: rowHeight });

        // Set header height (adjust as needed)
        const headerHeight = 30;
        ws['!rows'][headerRange.s.r] = { hpt: headerHeight * 1.25, hpx: headerHeight };

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
    }

    return (
        <>
            <button
                className="btn btn-light btn-sm form-control py-2"
                style={{ cursor: 'pointer', color: '#000', fontSize: '0.7875rem' }}
                onClick={(e) => exportToExcel(fileName)}
            >
                <MdDownload className='me-1' />
                Export Excel
            </button>

            {/* <button id="dropdownMenuButton"
                className="dropdown btn btn-light btn-sm form-control py-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: 'pointer', fontSize: '14px' }}
            >
                Export
            </button>
            <div className="dropdown-menu border-0" aria-labelledby="dropdownMenuButton"
                style={{ boxShadow: "0px 0px 15px -5px grey" }}>
                <Link
                    className="dropdown-item"
                    to="#"
                    style={{ color: "#676868" }}
                    onClick={(e) => exportToExcel(fileName)}
                >
                    Excel
                </Link>
                <Link
                    className="dropdown-item"
                    to="#"
                    style={{ color: "#676868" }}
                >
                    PDF
                </Link>
            </div> */}
        </>
    )
}

export default ExcelExport