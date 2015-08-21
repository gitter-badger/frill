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
      // key: '/path/to/key',
      // shallowClone: true,
    },
    test: {
      servers: 'nishino@192.168.1.4',
    },
  });

  shipit.task('pwd', () => {
    return shipit.remote('pwd');
  });

  shipit.on('updated', () => {
    const dir = path.join(shipit.releasesPath, shipit.releaseDirname);
    shipit.remote(`cd ${dir} && npm install && npm run build && node app.js`);
  });
};
