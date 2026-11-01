import {describe,it,expect} from 'vitest';
import {localUrl} from '../src/lib/database';
describe('test database isolation',()=>{
 it('accepts local test database',()=>expect(localUrl('postgresql://x@127.0.0.1/site152_test','site152_test')).toContain('site152_test'));
 it.each(['postgresql://x@production.example/site152_test','postgresql://x@127.0.0.1/production','postgresql://x@127.0.0.1/site152_test?host=production.example'])('rejects unsafe URL',url=>expect(()=>localUrl(url,'site152_test')).toThrow());
});
