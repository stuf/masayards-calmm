import { expect } from 'chai';
import * as L from 'partial.lenses';

export default (s, optic, state = s.view(optic()).get()) => {
  const qs = L.collect(['quests', L.values, L.props('id', 'type', 'category', 'title', 'detail')], state);
  expect(qs).to.eql([
    {
      id: 274,
      type: 4,
      category: 2,
      // state: 'INCOMPLETE',
      title: '「第六駆逐隊」対潜哨戒なのです！',
      detail: '「第六駆逐隊」を含む艦隊で鎮守府正面へ展開、対潜哨戒を実施せよ！',
      // progress: 0
    },
    {
      id: 289,
      type: 4,
      category: 2,
      // state: 'INCOMPLETE',
      title: '「第十六戦隊(第一次)」出撃せよ！',
      detail: '「第十六戦隊(第一次)」をバシー島沖に展開、敵艦隊を撃滅せよ！',
      // progress: 0
    },
    {
      id: 302,
      type: 2,
      category: 3,
      // state: 'IN_PROGRESS',
      title: '大規模演習',
      detail: '今週中に「演習」で他の提督の艦隊に対して20回「勝利」しよう！',
      // progress: 0.5
    },
    {
      id: 303,
      type: 1,
      category: 3,
      // state: 'IN_PROGRESS',
      title: '「演習」で練度向上！',
      detail: '本日中に他の司令官の艦隊に対して3回「演習」を挑もう！',
      // progress: 0
    },
    {
      id: 402,
      type: 1,
      category: 4,
      // state: 'COMPLETE',
      title: '「遠征」を３回成功させよう！',
      detail: '本日中に「遠征」３回成功させよう！',
      // progress: 0
    }
  ]);
};
