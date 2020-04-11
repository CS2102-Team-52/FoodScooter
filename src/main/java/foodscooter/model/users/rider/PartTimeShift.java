package foodscooter.model.users.rider;

public class PartTimeShift {
  private int ptsid;
  private int dow;
  private int startTime;
  private int endTime;

  public PartTimeShift(int ptsid, int dow, int startTime, int endTime) {
    this.ptsid = ptsid;
    this.dow = dow;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public int getPtsid() {
    return ptsid;
  }

  public void setPtsid(int ptsid) {
    this.ptsid = ptsid;
  }

  public int getDow() {
    return dow;
  }

  public void setDow(int dow) {
    this.dow = dow;
  }

  public int getStartTime() {
    return startTime;
  }

  public void setStartTime(int startTime) {
    this.startTime = startTime;
  }

  public int getEndTime() {
    return endTime;
  }

  public void setEndTime(int endTime) {
    this.endTime = endTime;
  }
}
