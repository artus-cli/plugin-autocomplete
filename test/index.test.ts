import { run } from './test-utils';
import os from 'node:os';

describe('test/index.test.ts', () => {
  it('should autocomplete works', async () => {
    if (os.platform() === 'win32') return;

    await run('my-bin', 'autocomplete zsh')
      // .debug()
      .expect('stdout', /Please copy the scripts/)
      .expect('stdout', /\.zshrc manually/)
      .end();

    await run('my-bin', 'autocomplete bash')
      // .debug()
      .expect('stdout', /Please copy the scripts/)
      .expect('stdout', /\.bashrc manually/)
      .end();

    await run('my-bin', 'autocomplete')
      // .debug()
      .writeKey('ENTER')
      .expect('stdout', /Please copy the scripts/)
      .expect('stdout', /\.zshrc manually/)
      .end();

    await run('my-bin', 'autocomplete')
      // .debug()
      .writeKey('DOWN')
      .writeKey('ENTER')
      .expect('stdout', /Please copy the scripts/)
      .expect('stdout', /\.bashrc manually/)
      .end();
  });

  it('should request completion without error', async () => {
    await run('my-bin', [ '--get-completion-argv=\'my-bin\'' ])
      // .debug()
      .expect('stdout', /help:show help infomation for command/)
      .expect('stdout', /autocomplete:autocomplete installation/)
      .expect('stdout', /cov:Run the coverage/)
      .end();

    await run('my-bin', [ '--get-completion-argv=\'my-bin dev\'' ])
      // .debug()
      .expect('stdout', /--help:Show Help/)
      .expect('stdout', /--node-flags:nodeFlags/)
      .expect('stdout', /--port:/)
      .end();
  });
});
