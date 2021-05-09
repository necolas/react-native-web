import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Example from '../../shared/example';

const placeholder = '/image/placeholder.svg';
const source =
  'https://images.unsplash.com/photo-1481595357459-84468f6eeaac?dpr=1&auto=format&fit=crop&w=376&h=251&q=60&cs=tinysrgb';
const agif =
  'http://38.media.tumblr.com/9e9bd08c6e2d10561dd1fb4197df4c4e/tumblr_mfqekpMktw1rn90umo1_500.gif';
const pjpeg = 'http://pooyak.com/p/progjpeg/jpegload.cgi?o=1';
const resizesource = '/image/smallflower.jpg';
const dataBase64Png =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
const dataBase64Svg =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgZmlsbD0iIzAwMDAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGQ9Ik0yNS44NjcsNDguODUzQzMyLjgwNiw1MC4xNzYsNDYuNDYsNTIuNSw2MS4yMTUsNTIuNWgwLjAwNWM5LjcxLDAsMTguNDAxLTEuMDU3LDI1LjkzOC0yLjkxMyAgIGMwLjE1OS0wLjA0NiwwLjM1LTAuMTM1LDAuNTY1LTAuMTg3YzAuMjgyLTAuMDcyLDAuNTY1LTAuMTY0LDAuODQ0LTAuMjM4YzMuMTg0LTAuOTY0LDIuNTc3LTMuMDUxLDIuMTk5LTMuODUyICAgYy00LjE2Ni03LjcxOS0xNS4wODYtMjMuNDE1LTM1LjAyOC0yMy40MTVjLTIyLjE2OSwwLTMwLjI2MiwxMC42MzUtMzMuMTQsMTkuNTg5QzIyLjU0NSw0Mi4zMzMsMjIuNDA3LDQ3LjEzNSwyNS44NjcsNDguODUzeiAgICBNMjguNjc2LDM4LjAzMmMwLjAxMy0wLjAzNiwwLjYxNC0xLjYyNiwxLjkyMy0xLjAwOGMxLjEzMywwLjUzNSwwLjk2MSwxLjU2MywwLjg4NywxLjg1Yy0wLjAwNywwLjAyNC0wLjAxNCwwLjA0OC0wLjAyMSwwLjA3MyAgIGMwLDAuMDAxLTAuMDAxLDAuMDA0LTAuMDAxLDAuMDA0bDAsMGMtMC4yNDksMC45MjktMC40MDQsMi4wODYtMC4wMTcsMi44NmMwLjE2LDAuMzE5LDAuNDkyLDAuNzY4LDEuNTQyLDAuOTg3bDAuMzY2LDAuMDc3ICAgYzIwLjgxNiw0LjM2LDM2LDIuOTMzLDQ1LjY3OCwwLjYyNmwtMC4wMDQsMC4wMDJjMCwwLDAuMDA1LTAuMDAyLDAuMDA3LTAuMDAzYzAuMjEyLTAuMDUsMC40MjEtMC4xMDEsMC42MjgtMC4xNTIgICBjMC41MDktMC4wNSwxLjE3MywwLjA3OCwxLjM5OSwxYzAuMzUxLDEuNDI0LTAuOTczLDEuODk1LTEuMjE3LDEuOTY5Yy01LjMyNSwxLjI3OS0xMi4yNjYsMi4zMDYtMjAuODM1LDIuMzA3ICAgYy03LjUwNSwwLTE2LjI1NS0wLjc4Ny0yNi4yNTctMi44ODJsLTAuMzY0LTAuMDc3Yy0yLjEyLTAuNDQyLTMuMTExLTEuNjMzLTMuNTY5LTIuNTU1QzI3Ljk4NSw0MS40MjEsMjguMjgxLDM5LjQxNiwyOC42NzYsMzguMDMyICAgeiI+PC9wYXRoPjxjaXJjbGUgY3g9IjEwLjQ5MyIgY3k9IjIzLjQ1NSIgcj0iMC42MTkiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0yLjA4LDI4LjMwOGMwLjY3Ni0wLjE3OCwwLjk4My0wLjM1MiwxLjE3NC0wLjVDNC42OSwyNi42OSw2LjUsMjcuNDgzLDcuNSwyOC4zNTd2MC4wMDJjMCwwLDEuNzExLDEuMjM1LDAuNzM3LDIuMjAyICAgYy0wLjk3NCwwLjk2NS0yLjMxOSwwLjAwNi0yLjMxOSwwLjAwNmwwLjAzNSwwLjAxNmMtMC4zMjctMC4yMDMtMC42LTAuNTYxLTAuNzgtMC41ODRjLTAuMzcsMC4yNi0wLjg3NiwwLjUtMS40NzYsMC41SDMuNyAgIGMwLDAtMS4zNDUsMC43MDksMC4xNzgsMS42NTJjMC4wMDEsMC4wMDEsMC4wMDIsMC4wNzIsMC4wMDQsMC4wNzNjMy45MzksMi4zNDIsOC4yNzEsNS43MDEsOC4yNzEsOC44OCAgIGMwLDAuNjkxLDAuMiwxNy4wNDIsMTcuNjI2LDI0LjczOWwwLjk2NywwLjQ0MmwtMC4xLDEuMDU5Yy0wLjQyMSw0LjM5LDEuMTQ1LDEwLjE5MSwxMC45OTMsMTIuODg4bDAuMTEzLDAuMDM4ICAgYzAuMDY3LDAuMDIzLDYuNzMyLDIuNDI5LDEwLjkwNywyLjQyOWMxLjU4NCwwLDIuMTU1LTAuMzUyLDIuMjQzLTAuNTYxYzAuMDg1LTAuMjAyLDAuNjEyLTIuMTY0LTYuMzMyLTkuMzg3bDAuMDAyLTAuMTgzICAgYzAsMC0yLjQ3Ny0zLjA3LDEuNTMzLTMuMDdjMC4wMSwwLDAuMDE5LDAsMC4wMjksMGMxLjI4NSwwLDIuNjA4LDAuMjE1LDMuOTgsMC4xODRjNC43NzEtMC4xMTcsOS4zMTYtMC40MjUsMTMuNTA2LTEuMDk2ICAgbDAuNDc0LTAuMDI4bDAuNjY4LDAuMTU4YzkuNjUxLDQuOTQ4LDE2LjczOCw3LjcxNiwxOS43MzgsNy43MTZ2MC4wMDZjMCwwLDAuMTY0LDAuMDExLDAuMjMsMC4wMDQgICBjLTAuMTg5LTAuNzIzLTIuMjMtMi44LTcuMjMtOS4wNzl2MC4wMjFjMCwwLTEuNTEyLTEuNjU4LDAuNzk3LTIuNjUzYzAuMDYzLTAuMDI2LDAuMDA4LDAuMDIzLDAuMDYtMC4wMDEgICBjOC42MzktMy41MDksMTMuNTAxLTguMjA0LDE1LjQxMS0xMS43NzVjMS4xNDUtMi4xMjksMC4yMDYtMi43ODQtMC42NTktMi45NzZjLTAuMzE3LTAuMDM4LTAuNjM0LTAuMDYyLTAuOTEyLTAuMDYyICAgYy0wLjIwNSwwLTAuMzc5LDAuMDEtMC41MjgsMC4wMjdsLTMuMTQzLDEuMjE0QzgzLjczMiw1My45MjYsNzMuMjE4LDU1LjUsNjEuMjIsNTUuNWMtMC4wMDIsMC0wLjAwNSwwLTAuMDA1LDAgICBjLTE1LjEyOCwwLTI5LjEwMS0yLjQzMi0zNi4wODMtMy43NzFsLTAuMTczLTAuMTExbC0wLjE2LTAuMTI2Yy01Ljg1OC0yLjY4MS01LjEzNy0xMC4yMDItNS4xMDMtMTAuNTE5bDAuMDYtMC4zICAgYzAuODk1LTIuODM4LDIuNDY3LTYuMzUyLDUuMjEzLTkuNzE5Yy0xLjgwOC0xLjM2OS00LjU5LTQuMTg4LTQuNDMtOC40OTRjMC4wNDYtMS4yNDQtMC40ODYtMi41MDgtMS40OTgtMy41NTkgICBjLTEuNDk4LTEuNTU1LTMuNzg1LTIuNDQ2LTYuMjc0LTIuNDQ2Yy0xLjc3LDAtMy41NTMsMC40NDItNS4yOTMsMS4zMTRjLTQuMDYxLDIuMDM1LTQuODU1LDQuNzM2LTUuNjkyLDcuNTk2ICAgYy0wLjEzNiwwLjQ2OC0wLjI4NCwwLjkzOS0wLjQzOCwxLjQxYy0wLjAwNiwwLjAxOS0wLjAyMiwwLjAzNS0wLjAyOCwwLjA1NkMwLjgzMywyOC40MjMsMS42OTEsMjguMzksMi4wOCwyOC4zMDh6IE0xMC40OTMsMTkuOTA4ICAgYzEuOTU2LDAsMy41NDgsMS41OTEsMy41NDgsMy41NDdjMCwxLjk1Ny0xLjU5MiwzLjU0OC0zLjU0OCwzLjU0OGMtMS45NTcsMC0zLjU0OC0xLjU5Mi0zLjU0OC0zLjU0OCAgIEM2Ljk0NCwyMS40OTksOC41MzYsMTkuOTA4LDEwLjQ5MywxOS45MDh6Ij48L3BhdGg+PC9nPjwvc3ZnPg==';
const dataSvg =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"><g fill="#61DAFB"><path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/><circle cx="420.9" cy="296.5" r="45.7"/><path d="M520.5 78.1z"/></g></svg>';

function Divider() {
  return <View style={styles.divider} />;
}

export default function ImagePage() {
  return (
    <Example title="Image">
      <Divider />
      <Image defaultSource={placeholder} style={styles.base} />
      <Divider />
      <Image
        defaultSource={placeholder}
        onError={() => {
          console.log('error');
        }}
        onLoad={() => {
          console.log('load');
        }}
        onLoadEnd={() => {
          console.log('load-end');
        }}
        onLoadStart={() => {
          console.log('load-start');
        }}
        source={source}
        style={styles.base}
      />
      <Divider />
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Static image</Text>
          <Image source={'/image/ladybug.jpg'} style={styles.image} />
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>Progressive JPEG</Text>
          <Image source={pjpeg} style={styles.image} />
        </View>
      </View>
      <Divider />
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Animated GIF</Text>
          <Image source={agif} style={styles.image} />
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>PNG (base64)</Text>
          <Image source={dataBase64Png} style={styles.image} />
        </View>
      </View>
      <Divider />
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>SVG (base64)</Text>
          <Image source={dataBase64Svg} style={styles.image} />
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>SVG (inline data)</Text>
          <Image source={dataSvg} style={styles.image} />
        </View>
      </View>
      <Divider />
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.text]}>Center</Text>
          <Image resizeMode="center" source={resizesource} style={styles.resizeMode} />
        </View>
        <View style={styles.column}>
          <Text style={[styles.text]}>Contain</Text>
          <Image resizeMode="contain" source={resizesource} style={styles.resizeMode} />
        </View>
      </View>
      <Divider />
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.text]}>Cover</Text>
          <Image resizeMode="cover" source={resizesource} style={styles.resizeMode} />
        </View>
        <View style={styles.column}>
          <Text style={[styles.text]}>Stretch</Text>
          <Image resizeMode="stretch" source={resizesource} style={styles.resizeMode} />
        </View>
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 200,
    width: 300
  },
  divider: {
    height: '1rem'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  column: {
    marginBottom: '1rem',
    marginHorizontal: '1rem'
  },
  text: {
    marginBottom: '0.5rem',
    textAlign: 'center'
  },
  image: {
    borderColor: 'black',
    borderWidth: 0.5,
    height: 120,
    width: 120,
    resizeMode: 'cover'
  },
  resizeMode: {
    borderColor: 'black',
    borderWidth: 0.5,
    height: 120,
    width: 120
  },
  leftMargin: {
    marginLeft: 10
  }
});
