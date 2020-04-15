package foodscooter.model.users.rider;

public class RiderFullTimeSchedule {
  private Integer[] dayOption;
  private Integer[] shiftOption;

  public RiderFullTimeSchedule(Integer[] dayOption, Integer[] shiftOption) {
    this.dayOption = dayOption;
    this.shiftOption = shiftOption;
  }

  public Integer[] getDayOption() {
    return dayOption;
  }

  public void setDayOption(Integer[] dayOption) {
    this.dayOption = dayOption;
  }

  public Integer[] getShiftOption() {
    return shiftOption;
  }

  public void setShiftOption(Integer[] shiftOption) {
    this.shiftOption = shiftOption;
  }
}
