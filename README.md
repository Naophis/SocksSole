# SocketI/O Serial Console

従来、シリアル通信の送受信には、テキストだけしか表示できなかったり、グラフ化の際にはデータ加工の手間がある。  
UIをブラウザのHTMLが利用できるため、個人の好みでGUIを作ることができる

## 必要な環境
* Node.js
* Python 2.7系 (Windowsのみ必要)

## 導入
```
 git clone https://github.com/Naophis/SocketIoSerialConsole.git
```
作業ディレクトリにて、以下を実行
```
npm install
```
node_moduleというディレクトリが生成されたら準備完了。

## 実行
ルートにあるindex.jsに対して、以下を実行
```
node index.js
```
これだけ

## 受信できるメッセージについて
文字列なら何でも可能です。ただし、加工の手間から、json形式を勧める。  

例
```
{
    "battery" : 7.625,
    "gyro":-0.12344,
    ・・・
}
```
メッセージの境界文字には改行コードを使用します。必ず入力してください。
```
{"battery" : 7.625, "gyro":-0.12345,・・・}\r\n{"battery" : 8.25, "gyro":-0.45678,・・・}\r\n
```
を一度に送信した場合、
```
{"battery" : 7.625, "gyro":-0.12344,・・・}
{"battery" : 7.625, "gyro":-0.12344,・・・}
```
と解釈します。


\begin{tikzpicture}
\newcounter{density}
\setcounter{density}{20}
    \def\couleur{red}
    \path[coordinate] (0,0)  coordinate(A)
                ++( 60:6cm) coordinate(B)
                ++(-60:6cm) coordinate(C);
    \draw[fill=\couleur!\thedensity] (A) -- (B) -- (C) -- cycle;
    \foreach \x in {1,...,15}{%
        \pgfmathsetcounter{density}{\thedensity+10}
        \setcounter{density}{\thedensity}
        \path[coordinate] coordinate(X) at (A){};
        \path[coordinate] (A) -- (B) coordinate[pos=.15](A)
                            -- (C) coordinate[pos=.15](B)
                            -- (X) coordinate[pos=.15](C);
        \draw[fill=\couleur!\thedensity] (A)--(B)--(C)--cycle;
    }
\end{tikzpicture}