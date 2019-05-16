package bitcamp.team.web.Authentication;

public class RandomNo {

  public static int randomNo() { 
    // Math.floor = 소수점 이하를 버린다.
    // (Math.random() * 1000000) = 1 ~ 999999.14159... 사이의 랜덤한 숫자를 출력한다.
    double result = Math.floor(Math.random() * 1000000) + 100000;
    if(result>1000000) {
      result = result - 100000;
    }

    return (int) result;
  }
}
