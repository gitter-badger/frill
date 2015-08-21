import path from 'path';
import shipitDeploy from 'shipit-deploy';

export default (shipit) => {
  shipitDeploy(shipit);
  shipit.initConfig({
    default: {
      workspace: './tmp/shipit',
      deployTo: './tmp/deploy',
      repositoryUrl: 'https://github.com/nanopx/frill',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '/Users/nanopx/.ssh/estlab_ssh',
      // shallowClone: true,
    },
    test: {
      servers: 'nishino@192.168.1.4',
    },
  });

  shipit.task('pwd', () => {
    return shipit.remote('pwd');
  });

  shipit.task('start', () => {
    const dir = path.join(shipit.releasesPath, shipit.releaseDirname);
    shipit.remote(`cd ${dir} && npm start`);
  });

  shipit.task('stop', () => {
    const dir = path.join(shipit.releasesPath, shipit.releaseDirname);
    shipit.remote(`cd ${dir} && npm stop`);
  });

  shipit.task('restart', () => {
    const dir = path.join(shipit.releasesPath, shipit.releaseDirname);
    shipit.remote(`cd ${dir} && npm restart`);
  });

  shipit.on('updated', () => {
    const dir = path.join(shipit.releasesPath, shipit.releaseDirname);
    shipit.remote(
      `cd ${dir} && npm install && npm run build && npm stop && npm start`
    );
  });
};
