import React from 'react';
import './SizeChartModal.css';

const SizeChartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sizeData = [
    { size: 'XXS', bust: '30', waist: '26', hips: '34' },
    { size: 'XS', bust: '32', waist: '28', hips: '36' },
    { size: 'S', bust: '34', waist: '30', hips: '38' },
    { size: 'M', bust: '36', waist: '32', hips: '40' },
    { size: 'L', bust: '38', waist: '34', hips: '42' },
    { size: 'XL', bust: '40', waist: '36', hips: '44' },
    { size: '2XL', bust: '42', waist: '38', hips: '46' },
    { size: '3XL', bust: '44', waist: '40', hips: '48' },
    { size: '4XL', bust: '46', waist: '42', hips: '50' },
    { size: '5XL', bust: '48', waist: '44', hips: '52' }
  ];

  return (
    <div className="size-modal-overlay" onClick={onClose}>
      <div className="size-modal" onClick={e => e.stopPropagation()}>
        <div className="size-modal-header">
          <h3>Size Chart (in inches)</h3>
          <button className="size-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="size-table-container">
          <table className="size-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Bust</th>
                <th>Waist</th>
                <th>Hips</th>
              </tr>
            </thead>
            <tbody>
              {sizeData.map(row => (
                <tr key={row.size}>
                  <td>{row.size}</td>
                  <td>{row.bust}</td>
                  <td>{row.waist}</td>
                  <td>{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;