package foodscooter.model.users.rider;

public class SalaryInfo {
  private int numOfOrder;
  private int riderSalary;

  public SalaryInfo(int numOfOrder, int riderSalary) {
    this.numOfOrder = numOfOrder;
    this.riderSalary = riderSalary;
  }

  public int getNumOfOrder() {
    return numOfOrder;
  }

  public void setNumOfOrder(int numOfOrder) {
    this.numOfOrder = numOfOrder;
  }

  public int getRiderSalary() {
    return riderSalary;
  }

  public void setRiderSalary(int riderSalary) {
    this.riderSalary = riderSalary;
  }
}
