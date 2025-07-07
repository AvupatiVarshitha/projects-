import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const PaymentSuccess = () => {
  const location = useLocation();
  const { paymentId, amount } = location.state || {};

  const downloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Phoenix Femmes Spa', 20, 20);

    doc.setFontSize(14);
    doc.text('🧾 Payment Receipt', 20, 40);

    doc.setFontSize(12);
    doc.text(`Payment ID: ${paymentId}`, 20, 60);
    doc.text(`Amount Paid: ₹${amount}`, 20, 70);
    doc.text('Thank you for your subscription!', 20, 90);
    doc.text('Visit Again 💖', 20, 100);

    doc.save(`receipt_${paymentId}.pdf`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for your subscription. Your payment was successful.</p>

      <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px auto', width: '60%' }}>
        <h2>🧾 Payment Receipt</h2>
        <p><strong>Payment ID:</strong> {paymentId}</p>
        <p><strong>Amount Paid:</strong> ₹{amount}</p>
        <button 
          onClick={downloadReceipt} 
          style={{ padding: '8px 16px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
          Download Receipt PDF
        </button>
      </div>

      <Link to="/">
        <button style={{ padding: '10px 20px', backgroundColor: '#3399cc', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
