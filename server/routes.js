import path from 'path';

export default function (app) {
  /*
  * Insert routes here
  */

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html'`));
    });
}
