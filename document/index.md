
## 标签页
![pagination](images/tab.jpg)
```
<ul class="nav-tabs">
    <li>
        <a href="javascript:;">用户管理</a>
    </li>
    <li class="active">
        <a href="javascript:;">添加用户</a>
    </li>
</ul>
```                        


## 分页
![pagination](images/pagination.jpg)

第二种样式需要在 pagination 中添加 nav 类。

```
<ul class="pagination nav">
    <li class="disabled page-item">
        <a class="page-link" href="#" aria-label="Previous"> 
            <span aria-hidden="true">上一页</span>
            <span class="sr-only">Previous</span>
        </a>
    </li>
    <li class="page-item active"><a class="page-link">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">4</a></li>
    <li class="page-item"><a class="page-link" href="#">5</a></li>
    <li class="page-item">
        <a class="page-link" href="/?page=2" aria-label="Next">
            <span aria-hidden="true">下一页</span>
            <span class="sr-only">Next</span>
        </a>
    </li>
</ul>
```

