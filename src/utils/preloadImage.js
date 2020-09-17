/**
 *
 * @param {*} url
 * @param {*} callback
 */
export default function(url, callback) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = url;

    //
    const func = {
      loaded: img => {
        return callback.loaded ? callback.loaded(img) : 'undefined';
      },
      error: img => {
        return callback.error ? callback.error(img) : 'undefined';
      },
      eventEnd: img => {
        return callback.eventEnd ? callback.eventEnd(img) : 'undefined';
      }
    };

    //
    img.addEventListener(
      'load',
      () => {
        func.loaded(img);
        func.eventEnd(img);
        resolve(img);
      },
      false
    );

    // 画像が読み込めなかった処理
    img.addEventListener(
      'error',
      () => {
        func.eventEnd(img);
        reject(new Error('GET ', img.src, '404 (Not Found)'));
      },
      false
    );
  });
}
