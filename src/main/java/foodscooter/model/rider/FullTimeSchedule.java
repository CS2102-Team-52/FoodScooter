package foodscooter.model.rider;

public class FullTimeSchedule {
  private int dayOption;
  private int shiftOption;

  public FullTimeSchedule(int dayOption, int shiftOption) {
    this.dayOption = dayOption;
    this.shiftOption = shiftOption;
  }

  public int getDayOption() {
    return dayOption;
  }

  public void setDayOption(int dayOption) {
    this.dayOption = dayOption;
  }

  public int getShiftOption() {
    return shiftOption;
  }

  public void setShiftOption(int shiftOption) {
    this.shiftOption = shiftOption;
  }
}
