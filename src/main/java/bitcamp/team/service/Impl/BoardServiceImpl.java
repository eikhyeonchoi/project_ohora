package bitcamp.team.service.Impl;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.BoardDao;
import bitcamp.team.domain.Board;
import bitcamp.team.service.BoardService;

@Service
public class BoardServiceImpl implements BoardService{

  BoardDao boardDao;

  public BoardServiceImpl(BoardDao boardDao) {
    this.boardDao = boardDao;
  }

  @Override
  public int add(Board board) {
    return boardDao.insert(board);
  }

  @Override
  public int update(Board board) {
    return boardDao.update(board);
  }

  @Override
  public int size(Map<String, Object> paramMap) {
    return boardDao.countAll(paramMap);
  }

  @Override
  public List<Board> list() {
    return boardDao.findAll();
  }

  @Override
  public Board get(int no) {
    return boardDao.detail(no);
  }


}
/*
    @Override
    public List<BoardReply> getReplyList(Map<String, Object> paramMap) {

        List<BoardReply> boardReplyList = boardDao.getReplyList(paramMap);

        //msyql 에서 계층적 쿼리가 어려우니 여기서 그냥 해결하자

        //부모
        List<BoardReply> boardReplyListParent = new ArrayList<BoardReply>();
        //자식
        List<BoardReply> boardReplyListChild = new ArrayList<BoardReply>();
        //통합
        List<BoardReply> newBoardReplyList = new ArrayList<BoardReply>();

        //1.부모와 자식 분리
        for(BoardReply boardReply: boardReplyList){
            if(boardReply.getDepth().equals("0")){
                boardReplyListParent.add(boardReply);
            }else{
                boardReplyListChild.add(boardReply);
            }
        }

        //2.부모를 돌린다.
        for(BoardReply boardReplyParent: boardReplyListParent){
            //2-1. 부모는 무조건 넣는다.
            newBoardReplyList.add(boardReplyParent);
            //3.자식을 돌린다.
            for(BoardReply boardReplyChild: boardReplyListChild){
                //3-1. 부모의 자식인 것들만 넣는다.
                if(boardReplyParent.getReply_id().equals(boardReplyChild.getParent_id())){
                    newBoardReplyList.add(boardReplyChild);
                }
            }
        }
        //정리한 list return
        return newBoardReplyList;
 */