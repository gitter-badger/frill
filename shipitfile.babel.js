import path from 'path';
import config from 'config';
import shipitDeploy from 'shipit-deploy';

export default (shipit) => {
  shipitDeploy(shipit);
  shipit.initConfig(config.get('deployments'));

  shipit.task('pwd', () => {
    return shipit.remote('pwd');
  });

  shipit.task('start', () => {
    shipit.remote(`cd ${shipit.config.deployTo}/current && npm start`);
  });

  shipit.task('stop', () => {
    shipit.remote(`cd ${shipit.config.deployTo}/current && npm stop`);
  });

  shipit.task('restart', () => {
    shipit.remote(`cd ${shipit.config.deployTo}/current && npm restart`);
  });

  shipit.on('updated', () => {
    const dir = path.join(shipit.releasesPath, shipit.releaseDirname);
    shipit.remote(
      `cd ${dir} && npm install && npm run build && npm stop && npm start`
    );
  });
};
