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
                'protocol' => 'SMTP_AUTH',
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
                "お問い合わせフォームから下記の内容で送信ががありました。\n\n".
                "お名前： ".$clean['name']."\n".
                "会社名： ".$clean['companyName']."\n".
                "電話番号： ".$clean['tel']."\n".
                "メールアドレス： ".$clean['mail']."\n".
                "お問い合わせ内容：\n".$clean['content']."\n"
            );

            if ( $mail->send() ) {

                $mail->to($clean['mail']);
                $mail->from('info@recoris.jp');
                $mail->subject('[RECORiS] お問い合わせありがとうございます');
                $mail->text(
                    "お問い合わせ内容は以下となります。\n\n".
                    "---\n".
                    "Name: ".$clean['name']."\n".
                    "Company name: ".$clean['companyName']."\n".
                    "Phone number: ".$clean['tel']."\n".
                    "Email address: ".$clean['mail']."\n".
                    "Content of inquiry:\n".$clean['content']."\n".
                    "---\n"
                );

                if ( $mail->send() ) {
                    header('Location: ./?form=ok#contact');
                    exit;
                }
            }
        }
    }
}

header('Location: ./?form=ng#contact');
exit;

?>