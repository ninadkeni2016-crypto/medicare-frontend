import React, { useRef } from 'react';
import { View, Modal, ActivityIndicator, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

interface RazorpayCheckoutProps {
    amount: number;
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    description?: string;
    prefillName?: string;
    prefillEmail?: string;
    prefillContact?: string;
}

const RAZORPAY_KEY_ID = 'rzp_test_SDfyU8TgeU3pcJ';

export default function RazorpayCheckout({
    amount,
    visible,
    onClose,
    onSuccess,
    description = 'MediCare Payment',
    prefillName = '',
    prefillEmail = '',
    prefillContact = '',
}: RazorpayCheckoutProps) {
    const webviewRef = useRef<WebView>(null);

    const amountInPaise = Math.round(amount * 100);

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            color: #334155;
        }
        .container {
            text-align: center;
            padding: 40px 20px;
        }
        .logo {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #0ea5e9, #0284c7);
            border-radius: 16px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 28px;
            font-weight: 900;
        }
        h2 { font-size: 20px; color: #0284c7; margin-bottom: 8px; }
        .amount { font-size: 32px; font-weight: 800; color: #0284c7; margin: 16px 0; }
        .amount span { font-size: 18px; font-weight: 400; color: #64748b; }
        p { color: #64748b; font-size: 14px; margin-bottom: 24px; }
        .btn {
            background: linear-gradient(135deg, #0ea5e9, #0284c7);
            color: #fff;
            border: none;
            padding: 16px 48px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            width: 100%;
            max-width: 320px;
            letter-spacing: 0.5px;
        }
        .btn:active { opacity: 0.9; transform: scale(0.98); }
        .secure { color: #94a3b8; font-size: 11px; margin-top: 20px; }
        .cancel { color: #94a3b8; font-size: 13px; margin-top: 16px; cursor: pointer; background: none; border: none; text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">M</div>
        <h2>MediCare</h2>
        <p>${description}</p>
        <div class="amount">₹${amount.toLocaleString('en-IN')} <span>INR</span></div>
        <button class="btn" onclick="startPayment()">Pay with Razorpay</button>
        <p class="secure">🔒 Secured by Razorpay • 100% Safe & Encrypted</p>
        <button class="cancel" onclick="cancelPayment()">Cancel</button>
    </div>

    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script>
        function startPayment() {
            var options = {
                key: '${RAZORPAY_KEY_ID}',
                amount: ${amountInPaise},
                currency: 'INR',
                name: 'MediCare',
                description: '${description}',
                image: '',
                handler: function(response) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'success',
                        paymentId: response.razorpay_payment_id
                    }));
                },
                prefill: {
                    name: '${prefillName}',
                    email: '${prefillEmail || 'patient@medicare.com'}',
                    contact: '${prefillContact || '9999999999'}'
                },
                notes: {
                    address: 'MediCare Healthcare'
                },
                theme: {
                    color: '#0284c7'
                },
                modal: {
                    ondismiss: function() {
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'dismissed'
                        }));
                    }
                }
            };
            var rzp = new Razorpay(options);
            rzp.on('payment.failed', function(response) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'error',
                    error: response.error.description
                }));
            });
            rzp.open();
        }

        function cancelPayment() {
            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'cancelled'
            }));
        }
    </script>
</body>
</html>
`;

    const handleMessage = (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'success') {
                onSuccess();
            } else if (data.type === 'cancelled' || data.type === 'dismissed') {
                onClose();
            } else if (data.type === 'error') {
                onClose();
            }
        } catch (e) {
            // ignore
        }
    };

    if (!visible) return null;

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
                {Platform.OS === 'web' ? (
                    <iframe
                        srcDoc={htmlContent}
                        style={{ flex: 1, border: 'none', width: '100%', height: '100%' }}
                        title="Razorpay Checkout"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                ) : (
                    <WebView
                        ref={webviewRef}
                        source={{ html: htmlContent }}
                        onMessage={handleMessage}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        renderLoading={() => (
                            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
                                <ActivityIndicator size="large" color="#0284c7" />
                            </View>
                        )}
                        style={{ flex: 1 }}
                        originWhitelist={['*']}
                        mixedContentMode="always"
                        allowsInlineMediaPlayback={true}
                    />
                )}
            </View>
        </Modal>
    );
}
