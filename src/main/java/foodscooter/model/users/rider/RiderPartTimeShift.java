package foodscooter.model.users.rider;

public class RiderPartTimeShift {
  private int ptsid;
  private int drid;
  private int dow;
  private int startHour;
  private int endHour;

  public RiderPartTimeShift(int ptsid, int drid, int dow, int startHour, int endHour) {
    this.ptsid = ptsid;
    this.drid = drid;
    this.dow = dow;
    this.startHour = startHour;
    this.endHour = endHour;
  }

  public int getPtsid() {
    return ptsid;
  }

  public void setPtsid(int ptsid) {
    this.ptsid = ptsid;
  }

  public int getDrid() {
    return drid;
  }

  public void setDrid(int drid) {
    this.drid = drid;
  }

  public int getDow() {
    return dow;
  }

  public void setDow(int dow) {
    this.dow = dow;
  }

  public int getStartHour() {
    return startHour;
  }

  public void setStartHour(int startHour) {
    this.startHour = startHour;
  }

  public int getEndHour() {
    return endHour;
  }

  public void setEndHour(int endHour) {
    this.endHour = endHour;
  }
}
