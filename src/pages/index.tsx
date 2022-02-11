import styles from './index.less';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message, Alert } from 'antd';
import classnames from 'classnames';
import { CopyOutlined } from '@ant-design/icons';

export default function IndexPage() {
  const [threema, setThreema] = useState(true);
  const [value, setValue] = useState('Assets');
  const [isBrow, setIsBrow] = useState(true);
  const [tabkeys, setTabkeys] = useState(1);
  const [childTabKeys, setChildTabKeys] = useState(1);

  useEffect(() => {
    setIsBrow(!isMobileDev());
  }, [threema]);

  const isMobileDev = () => {
    let u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      //安卓手机
      return true;
    } else if (u.indexOf('iPhone') > -1) {
      //苹果手机
      return true;
    } else if (u.indexOf('Windows Phone') > -1) {
      //winphone手机
      return true;
    }
    return false;
  };

  return (
    <div
      className={classnames(styles.container, !threema && styles.dark_threema)}
    >
      <header className={styles.header}>
        <button
          className={styles.toggle_threema}
          onClick={() => setThreema(!threema)}
        >
          {threema ? (
            <svg
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              shape-rendering="geometricPrecision"
              viewBox="0 0 24 24"
              height="14"
              width="14"
              fill="currentcolor"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              shape-rendering="geometricPrecision"
              viewBox="0 0 24 24"
              height="14"
              width="14"
              fill="currentcolor"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
            </svg>
          )}
        </button>
      </header>
      <section className={styles.mainbox}>
        <header>
          <h2 className={styles.customsize}>DeepLink for hwaToken</h2>
          <p>
            This is hwaToken's DeepLink testing tool, you can open and access the
            link on your mobile device to test it. For more information, please
            visit our
            <a
              href="http://doc.hchains.cn/deep_link.html"
              target="_blank"
              className="link"
            >
              open documentation
            </a>
          </p>
          <span className={styles.space} />
          {isBrow && (
            <Alert
              message="note:Not currently on a mobile device and may not trigger DeepLink correctly."
              type="warning"
            />
          )}
        </header>
        <main className={styles.contentbox}>
          <div className={styles.resultbox}>
            <div className={styles.resulttop}>
              <a
                href={'hwanc://wallet/' + value}
                className={styles.deeplink}
              >
                {'hwanc://wallet/' + value}
              </a>
            </div>
            <div className={styles.copybox}>
              <CopyToClipboard
                text={'hwanc://wallet/' + value}
                onCopy={() => message.info('复制成功')}
              >
                <button className={styles.copybtn}>
                  <CopyOutlined size={10} />
                  <span className={styles.copytext}>Copy URL</span>
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <span className={styles.space} />
          <div className={styles.settingsbox}>
            <header className={styles.hide_divider}>
              <div
                role="button"
                className={classnames(
                  styles.tabitem,
                  tabkeys == 1 && styles.active,
                )}
                onClick={() => {
                  setTabkeys(1);
                  setChildTabKeys(1);
                  setValue('Assets');
                }}
              >
                Preset
              </div>
              <div
                role="button"
                className={classnames(
                  styles.tabitem,
                  tabkeys == 2 && styles.active,
                )}
                onClick={() => {
                  setTabkeys(2);
                }}
              >
                Custom
              </div>
            </header>
            <div className={styles.content}>
              {tabkeys == 1 ? (
                <SelectElem
                  childTabKeys={childTabKeys}
                  onChange={(keys: any, routename: any) => {
                    setChildTabKeys(keys);
                    setValue(routename);
                  }}
                />
              ) : (
                <InputElem onChange={(routename: any) => setValue(routename)} />
              )}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

const SelectElem = ({ childTabKeys, onChange }: any) => {
  return (
    <div className={styles.tabitem}>
      <span className={styles.space} />
      <div className={styles.tabitemmain}>
        <div
          className={styles.routeritem}
          onClick={() => onChange(1, 'Assets')}
        >
          <div className={styles.radioitem}>
            <span
              className={classnames(
                styles.radioicon,
                childTabKeys == 1 && styles.active,
              )}
            ></span>
            <label>
              <span className={styles.routeritemname}>AssetsTab</span>
              <span className={styles.routeritemdesc}>
                Application default home page
              </span>
            </label>
          </div>
        </div>
        <div
          className={styles.routeritem}
          onClick={() => onChange(2, 'HWADEX')}
        >
          <div className={styles.radioitem}>
            <span
              className={classnames(
                styles.radioicon,
                childTabKeys == 2 && styles.active,
              )}
            ></span>
            <label>
              <span className={styles.routeritemname}>MarketTab</span>
              <span className={styles.routeritemdesc}>Market Quotes Tab</span>
            </label>
          </div>
        </div>
        <div
          className={styles.routeritem}
          onClick={() =>
            onChange(
              3,
              'DappView?url=' +
                encodeURIComponent('https://id.hwanc.net/hwancchat/index.html'),
            )
          }
        >
          <div className={styles.radioitem}>
            <span
              className={classnames(
                styles.radioicon,
                childTabKeys == 3 && styles.active,
              )}
            ></span>
            <label>
              <span className={styles.routeritemname}>DappView</span>
              <span className={styles.routeritemdesc}>Charge the DApp</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputElem = ({ onChange }: any) => {
  return (
    <div className={styles.tabitem}>
      <span className={styles.space} />
      <div className={styles.tabitemmain}>
        <div className={styles.inputbox}>
          <p className={styles.inputtext}>
            You only need to fill in the custom section of the link, please note
            that the case is case sensitive.
          </p>
          <div className={styles.inputmain}>
            <div className={styles.inputcontent}>
              <span className={styles.inputlefttext}>hwanc://wallet/</span>
              <div className={styles.inputcontiner}>
                <input
                  placeholder="router name"
                  onChange={(e) => onChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
