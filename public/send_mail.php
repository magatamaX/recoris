<?php
require_once('./qdmail/qdmail.php');
require_once('./qdmail/qdsmtp.php');

if( !empty($_POST) ) {
    $clean = array();
    foreach( $_POST as $key => $value ) {
        $clean[$key] = htmlspecialchars( $value, ENT_QUOTES);
    }

    if (!empty($clean['name']) &&
        !empty($clean['companyName']) &&
        !empty($clean['tel']) &&
        !empty($clean['mail']) &&
        !empty($clean['content'])
    ) {
        if(filter_var($clean['mail'], FILTER_VALIDATE_EMAIL)){

            $mail = new Qdmail();

            $mail -> errorDisplay( false );
            $mail -> smtp( true );
            $mail -> lineFeed('\n');

            $param = array(
                'host' => 'sv1406.xserver.jp',
                'port' => 587,
                'from' => 'info@recoris.jp',
                'protocol' => 'SMTP',
                'user' => 'info@recoris.jp',
                'pass' => 'accesspass'
            );
            $mail->smtpServer($param);

            $mail->to('info@recoris.jp');
            $mail->from('info@recoris.jp');
            $mail->subject('[RECORiS]WEBサイトよりお問い合わせがありました');
            $mail->text(
                "--------------------------------------------------------------\n".
                "このメールはシステムからの自動送信メールです。\n".
                "--------------------------------------------------------------\n\n".
                "お問い合わせフォームから下記の内容で送信がありました。\n\n".
                "お名前： ".$clean['name']."\n".
                "会社名： ".$clean['companyName']."\n".
                "部署名： ".$clean['departmentName']."\n".
                "電話番号： ".$clean['tel']."\n".
                "メールアドレス： ".$clean['mail']."\n".
                "お問い合わせ内容：\n".$clean['content']."\n"
            );

            if ( $mail->send() ) {



                $mail = new Qdmail();

                $mail -> errorDisplay( false );
                $mail -> smtp( true );
                $mail -> lineFeed('\n');
                $mail->smtpServer($param);

//                $mail->to($clean['mail']);
/* $mail->to('sehoon.lee@thesss.net');
                $mail->from('info@recoris.jp');
                $mail->subject('[RECORiS] お問い合わせありがとうございます');
                $mail->text(
                    "お問い合わせ内容は以下となります。\n\n".
                    "---\n".
                    "Name: ".$clean['name']."\n".
                    "Company name: ".$clean['companyName']."\n".
                    "Department name: ".$clean['departmentName']."\n".
                    "Phone number: ".$clean['tel']."\n".
                    "Email address: ".$clean['mail']."\n".
                    "Content of inquiry:\n".$clean['content']."\n".
                    "---\n"
                );

                if ( $mail->send() ) {
                    header('Location: ./contact/success.html');
                    exit;
                }
*/
header('Location: ./contact/success.html');
exit;
            }
        }
    }
}

header('Location: ./contact/failure.html');
exit;

?>