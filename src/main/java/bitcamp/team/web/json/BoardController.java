package bitcamp.team.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Board;
import bitcamp.team.domain.BoardReply;
import bitcamp.team.service.BoardService;
import bitcamp.team.service.MemberService;

@RestController("json/BoardController")
@RequestMapping("/json/board")
public class BoardController {

  BoardService boardService;
  @Autowired
  MemberService memberService;

  public BoardController(BoardService boardService) {
    this.boardService = boardService;
  }

  @GetMapping("list")
  public Object list() {
    HashMap<String, Object> content = new HashMap<>();
    content.put("list", boardService.list());

    return content;
  }

  @GetMapping("detail")
  public Object detail(int no) {
    HashMap<String, Object> content = new HashMap<>();
    content.put("list", boardService.get(no));
    content.put("replylist", boardService.replyList(no));

    return content;
  }

  @PostMapping("add")
  public Object add(Board board) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      if (board.getTitle() == "")
        throw new Exception("필수 입력 사항을 입력하지 않았습니다");

      boardService.add(board);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // add

  @PostMapping("update")
  public Object update(Board board) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      if (boardService.update(board) == 0)
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // update


  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      if (boardService.delete(no) == 0)
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // delete

  @PostMapping("addReply")
  public Object add(BoardReply boardReply) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      System.out.println(boardReply);
      String name = boardReply.getMemberName();

      boardReply.setMemberId(memberService.getNo(name));
      if (boardReply.getContents() == "")
        throw new Exception("내용을 입력하지 않았습니다");

      if (boardReply.getDepth() != 0) {
        String con = "ㄴ " + boardReply.getContents();
        boardReply.setContents(con);
      }
      boardService.insertReply(boardReply);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // add


  @GetMapping("deleteReply")
  public Object deleteReply(int no) {
    HashMap<String, Object> content = new HashMap<>();
    BoardReply currRp = boardService.getReply(no); // 현재 댓글
    int boardNo = currRp.getBoardId(); // 현재 댓글의 board id
    List<BoardReply> brs = boardService.replyList(boardNo); // 현재 게시판의 모든 댓글
    int rereCount = 0; // 같은 댓글 밑의 child 댓글 개수
    int parentNo = currRp.getParentId(); // 현재 댓글의 parent id

    try {
      if (currRp.getParentId() == 0) {
        for (BoardReply re : brs) {
          if (currRp.getNo() == re.getParentId()) {
            currRp.setContents("(삭제 된 댓글입니다.)");
            currRp.setRegisterDate("0");
            currRp.setMemberName("");
            boardService.updateReply(currRp);
            break;
          } // if(대댓글 유무 비교)
        } // for(댓글 + 대댓글 불러오기); 대댓글 유무 비교를 위함
      } // if(댓글인지 대댓글인지 비교)
      if (currRp.getRegisterDate() == "0") {
        // (수정한 댓글일 경우 delete 안 하게끔 넘기기)
      } else if (boardService.deleteReply(no) == 0) {
        // 대댓글이 없는 댓글이거나 대댓글일 경우 넘어옴
        throw new RuntimeException("해당 번호의 댓글이 없습니다.");
      } else {
        // 대댓글이 없는 댓글이거나 대댓글일 경우 넘어옴2
        for (BoardReply re : brs) {
          if (parentNo == re.getParentId()) {
            // 다른 대댓글이 있을 경우 rereCount 하나씩 증가 (= 같은 parent id를 쓰는 대댓글의 개수)
            rereCount++;
            if (brs.size() == 0) {
              break;
            }
          } // if()
        } // for(한 게시판의 모든 댓글 검사)
        if (parentNo != 0) {
          // parent no가 0일 경우
          // boardService.getReply(parentNo).getRegisterDate().contains("0000-00-00")를 실행할 수 없음.
          if (rereCount == 1
              && boardService.getReply(parentNo).getRegisterDate().contains("0000-00-00")) {
            // 대댓글이 1이고, register date가 0일때 부모 댓글이 삭제
            boardService.deleteReply(parentNo);
          }
        }
      }
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // deleteReply

  @PostMapping("updateReply")
  public Object updateReply(BoardReply boardReply) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      if (boardService.updateReply(boardReply) == 0)
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // updateReply


}
